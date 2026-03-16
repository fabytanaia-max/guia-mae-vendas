#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function normalizeBaseUrl(input) {
  if (!input) return '';
  return input.trim().replace(/\/+$/, '');
}

function createUrl(baseUrl, page, params) {
  const url = new URL(`${baseUrl}/${page}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

function buildCampaignRows(baseUrl) {
  const sources = ['meta', 'tiktok'];
  const offers = [
    {
      key: 'main',
      page: 'index.html',
      campaign: 'ecom_pt_main',
      content: {
        meta: 'video_before_after',
        tiktok: 'demo_20s',
      },
      term: 'kit_12',
    },
    {
      key: 'low_ticket',
      page: 'low-ticket.html',
      campaign: 'ecom_pt_low_ticket',
      content: {
        meta: 'video_offer_direct',
        tiktok: 'offer_12s',
      },
      term: 'mini_kit',
    },
  ];

  const rows = [];
  offers.forEach((offer) => {
    sources.forEach((source) => {
      ['A', 'B'].forEach((variant) => {
        rows.push({
          offer: offer.key,
          source,
          variant,
          url: createUrl(baseUrl, offer.page, {
            utm_source: source,
            utm_medium: 'paid_social',
            utm_campaign: offer.campaign,
            utm_content: offer.content[source],
            utm_term: offer.term,
            price_variant: variant,
          }),
        });
      });
    });
  });

  return rows;
}

function renderMarkdown(baseUrl, rows) {
  const now = new Date().toISOString();
  const header = [
    '# Campaign URLs (Generated)',
    '',
    `- Generated at: ${now}`,
    `- Base URL: ${baseUrl}`,
    '',
  ];

  const groups = {
    main: 'Main Offer',
    low_ticket: 'Low Ticket',
  };

  const lines = [...header];
  Object.keys(groups).forEach((offerKey) => {
    lines.push(`## ${groups[offerKey]}`);
    lines.push('');
    ['meta', 'tiktok'].forEach((source) => {
      lines.push(`### ${source.toUpperCase()}`);
      lines.push('');
      rows
        .filter((row) => row.offer === offerKey && row.source === source)
        .forEach((row) => {
          lines.push(`- Variante ${row.variant}`);
          lines.push(`  - ${row.url}`);
        });
      lines.push('');
    });
  });

  return lines.join('\n');
}

function main() {
  const baseUrl = normalizeBaseUrl(process.argv[2] || process.env.BASE_URL || '');
  if (!baseUrl) {
    console.error('Usage: node generate-campaign-urls.js <BASE_URL>');
    process.exit(1);
  }

  const rows = buildCampaignRows(baseUrl);
  const markdown = renderMarkdown(baseUrl, rows);

  const outputPath = path.join(__dirname, 'campaign-urls.generated.md');
  fs.writeFileSync(outputPath, markdown, 'utf8');
  console.log(`Generated: ${outputPath}`);
}

main();
