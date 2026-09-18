import PDFDocument from 'pdfkit';
import { mkdirSync, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';

const OUT_DIR = resolve('reports');
mkdirSync(OUT_DIR, { recursive: true });

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const ML = 50;
const MR = 50;
const MT = 48;
const MB = 72;
const CONTENT_W = PAGE_W - ML - MR;

const PRIMARY = '#1d4ed8';
const TEAL = '#0d9488';
const INK = '#0f172a';
const SUB = '#475569';
const MUTED = '#94a3b8';
const LINE = '#e2e8f0';
const FILL = '#f1f5f9';

function build(path, label, draw) {
  return new Promise((resolvePromise, rejectPromise) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: MT, left: ML, right: MR, bottom: MB },
      bufferPages: true,
      autoFirstPage: true,
    });

    const out = createWriteStream(path);
    doc.pipe(out);

    out.on('error', rejectPromise);
    out.on('close', resolvePromise);

    doc.on('error', rejectPromise);

    const state = { y: MT };

    const ensureSpace = (need) => {
      if (state.y + need > PAGE_H - MB) {
        doc.addPage();
        state.y = MT;
      }
    };

    const cover = (tag, title, subtitle) => {
      const bandH = 190;
      const pad = 26;
      ensureSpace(bandH + 28);
      const top = state.y;
      doc.rect(ML, top, 5, bandH).fill(TEAL);
      doc.rect(ML + 5, top, CONTENT_W - 5, bandH).fill(PRIMARY);
      doc.fillColor('#dbeafe').font('Helvetica-Bold').fontSize(8.5).text(tag.toUpperCase(), ML + pad, top + 28, { lineBreak: false });
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(26).text(title, ML + pad, top + 48, { width: CONTENT_W - pad * 2 });
      doc.fillColor('#bfdbfe').font('Helvetica').fontSize(10.5).text(subtitle, ML + pad, top + bandH - 48, { width: CONTENT_W - pad * 2 });
      state.y = top + bandH + 30;
    };

    const section = (text) => {
      ensureSpace(64);
      doc.rect(ML, state.y, 4, 18).fill(PRIMARY);
      doc.fillColor(INK).font('Helvetica-Bold').fontSize(14).text(text, ML + 14, state.y, { lineBreak: false });
      doc.moveTo(ML, state.y + 26).lineTo(PAGE_W - ML, state.y + 26).lineWidth(0.6).strokeColor(LINE).stroke();
      state.y += 36;
    };

    const para = (text, opts = {}) => {
      const size = opts.size ?? 10;
      ensureSpace(size * 2 + 6);
      doc
        .fillColor(opts.color ?? SUB)
        .font(opts.bold ? 'Helvetica-Bold' : 'Helvetica')
        .fontSize(size)
        .text(text, ML, state.y, { width: CONTENT_W, lineGap: 3, align: opts.align ?? 'left' });
      state.y = doc.y + 10;
    };

    const bullet = (text, opts = {}) => {
      const size = 10;
      const bx = ML + (opts.indent ?? 0);
      const tw = CONTENT_W - (opts.indent ?? 0) - 16;
      const full = opts.lead ? `${opts.lead}  ` : '';
      const h = doc
        .font('Helvetica')
        .fontSize(size)
        .heightOfString(full + text, { width: tw, lineGap: 3 });
      ensureSpace(h + 5);
      doc.fillColor(PRIMARY).font('Helvetica-Bold').fontSize(size).text('\u2022', bx, state.y, { lineBreak: false });
      if (opts.lead) {
        doc
          .font('Helvetica-Bold')
          .fillColor(PRIMARY)
          .fontSize(size)
          .text(opts.lead, bx + 13, state.y, { continued: true, lineGap: 3 })
          .font('Helvetica')
          .fillColor(INK)
          .text(text, { width: tw - 1 });
      } else {
        doc.font('Helvetica').fillColor(INK).fontSize(size).text(text, bx + 13, state.y, { width: tw, lineGap: 3 });
      }
      state.y = doc.y + 6;
    };

    const note = (text, opts = {}) => {
      const pad = 10;
      const innerW = CONTENT_W - pad * 2 - 5;
      const h = doc.font('Helvetica').fontSize(9.5).heightOfString(text, { width: innerW, lineGap: 2 }) + pad * 2;
      ensureSpace(h + 10);
      const top = state.y;
      doc.rect(ML, top, CONTENT_W, h).fill(opts.fill ?? '#dbeafe');
      doc.rect(ML, top, 4, h).fill(opts.accent ?? PRIMARY);
      doc
        .fillColor(opts.textColor ?? '#1e40af')
        .font('Helvetica')
        .fontSize(9.5)
        .text(text, ML + pad + 5, top + pad, { width: innerW, lineGap: 2 });
      state.y = top + h + 12;
    };

    const table = (columns, rows, widths, opts = {}) => {
      const fs = opts.fontSize ?? 8.5;
      const headerH = 24;
      const rowPad = 6;
      const colX = [];
      let x = ML;
      widths.forEach((w) => {
        colX.push(x);
        x += w;
      });
      const cellWs = widths.map((w) => w - 12);

      ensureSpace(headerH + 12);
      doc.rect(ML, state.y, CONTENT_W, headerH).fill(opts.headerFill ?? PRIMARY);
      columns.forEach((c, i) => {
        doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(fs).text(c, colX[i] + 6, state.y + (headerH - fs) / 2, { width: cellWs[i], lineBreak: false });
      });
      state.y += headerH;

      rows.forEach((row, ri) => {
        const heights = row.map((cell, i) =>
          doc.font('Helvetica').fontSize(fs).heightOfString(String(cell), { width: cellWs[i], lineGap: 2 })
        );
        const rowH = Math.max(...heights) + rowPad * 2;
        ensureSpace(rowH);
        const top = state.y;
        if (ri % 2 === 1) doc.rect(ML, top, CONTENT_W, rowH).fill(FILL);
        row.forEach((cell, i) => {
          doc
            .fillColor(opts.rowColor ?? SUB)
            .font(ri === 0 ? 'Helvetica-Bold' : 'Helvetica')
            .fontSize(fs)
            .text(String(cell), colX[i] + 6, top + rowPad, { width: cellWs[i], lineGap: 2 });
        });
        state.y = top + rowH;
        doc.moveTo(ML, state.y).lineTo(PAGE_W - ML, state.y).lineWidth(0.5).strokeColor(LINE).stroke();
      });
      state.y += 14;
    };

    const stamp = (index, total) => {
      const fy = PAGE_H - MB + 28;
      doc.lineWidth(0.6);
      doc.moveTo(ML, fy - 10).lineTo(PAGE_W - ML, fy - 10).strokeColor(LINE).stroke();
      doc.fillColor(MUTED).font('Helvetica').fontSize(8).text(label, ML, fy, { lineBreak: false });
      doc.text(`Page ${index} of ${total}`, ML, fy, { width: CONTENT_W, align: 'right', lineBreak: false });
    };

    try {
      draw({ doc, state, cover, section, para, bullet, note, table, ensureSpace });

      const range = doc.bufferedPageRange();
      for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        stamp(i - range.start + 1, range.count);
      }
      doc.end();
    } catch (err) {
      rejectPromise(err);
    }
  });
}

function buildChangesAndImprovements() {
  return build(resolve(OUT_DIR, 'what-we-changed-and-improved.pdf'), 'Tribal Scholar AI — Admin panel', ({ cover, section, para, bullet, note, table }) => {
    cover(
      'Team: Admin panel \u00b7 branch feature/admin',
      'What We Changed and Improved',
      'Tribal Scholar AI \u2014 AI-enabled Scholarship and Fellowship Management System \u00b7 MoTA Hackathon Prototype'
    );

    section('Overview');
    para(
      'This document summarises everything delivered since the project scaffold. The admin portal started as a set of empty placeholder pages and now covers the full scholarship lifecycle: a data-rich dashboard, application review with AI/OCR document checks, deficiency management, selection scoring with merit lists, reports and analytics, and a complete audit trail. The applicant portal and marketing landing page were built out with the same polish.'
    );
    para(
      'All screens run against an isolated mock-data layer, so the UI is fully interactive today and ready to be wired to live API endpoints (contracts are documented in docs/api.md).'
    );

    section('1 \u00b7 Foundation');
    bullet('Next.js 16 (App Router), TypeScript, Tailwind CSS v4, ESLint 9, Prisma ORM with PostgreSQL; shared types and utilities under src/types and src/lib.', { lead: 'Modern stack' });
    bullet('Architecture, database schema, API contracts, workflow rulebook, scheme rulebook, AI/OCR contract, demo script, GitHub workflow, issue list and team status tracker (docs/).', { lead: 'Documentation' });
    bullet('Full Prisma schema with an initial migration and rich seed data: two schemes (NFST and NOS), eligibility rules, required documents, form fields, demo users and sample applications.', { lead: 'Database and seed' });

    section('2 \u00b7 Admin Portal');
    para('The admin area was upgraded from empty stubs into an end-to-end operational panel.', { size: 10 });
    table(
      ['Feature', 'What was delivered', 'Commits'],
      [
        ['Admin Dashboard', 'KPI stat cards, quick actions, recent applications, application trend chart, scheme-split donut, status distribution, per-scheme pipeline cards and a needs-attention panel.', '98100c5, 3f06869'],
        ['Application management', 'Searchable and filterable applications table; rich review page with applicant details, scheme-specific fields, AI/OCR results, eligibility pass/fail and a status timeline.', '55630d2'],
        ['Document verification', 'Document queue with OCR confidence bars, status/type filters and an inspect modal to mark documents verified or rejected.', '55630d2, c58d580'],
        ['Deficiency management', 'Create deficiencies against any application, live open/responded/resolved/rejected counters, and a review panel to resolve or reject with remarks.', '7e909a8'],
        ['Selection and merit list', 'Scheme-wise criteria scoring with live totals, a ranked merit list and bulk select/reject actions.', '8db5793'],
        ['Reports and analytics', 'KPI cards, weekly application trend, scheme split, top applicant states and full status distribution charts.', 'c58d580'],
        ['Audit log', 'Immutable, filterable trail of every action with the actor, timestamp and details.', 'c58d580'],
      ],
      [112, 300, 83],
      { rowColor: INK }
    );

    section('3 \u00b7 Applicant Portal');
    bullet('Brand-new applications list and detail pages with an animated status stepper so applicants can follow their application end to end.', { lead: 'Application tracking' });
    bullet('Dashboard, scheme browsing, profile, documents and notifications views for the applicant.', { lead: 'Supporting pages' });
    bullet('ApplicationCard and StatusStepper extracted as shared building blocks for consistent rendering.', { lead: 'Reusable components' });

    section('4 \u00b7 Landing Page and Design System');
    bullet('Rebuilt landing page with an animated preloader, hero effects, a live preview card, rotating scheme words, count-up statistics and scroll reveals.', { lead: 'Landing page' });
    bullet('Portal-aware header and a redesigned footer with a live workflow pipeline, CTA band, team socials and a ghost wordmark.', { lead: 'Header and footer' });
    bullet('All charts are pure CSS/SVG (area, donut, bar and status grid) with no chart dependency, keeping the bundle small.', { lead: 'Charts without libraries' });
    bullet('Sticky desktop sidebar plus a horizontal pill navigation on mobile with active-state styling.', { lead: 'Responsive navigation' });
    bullet('Shared components (Logo, NavIcon, PageHeader, ResultBadge, StatsCards, KpiStrip, QuickActions, NeedsAttention) and helpers (formatStatus, getStatusColor, date formatting).', { lead: 'Consistency' });
    bullet('Modal focus and close handling for the deficiency and status dialogs, aria labels, hover states and removal of the global dark-mode override.', { lead: 'Accessibility and cleanup' });

    section('5 \u00b7 Engineering Quality');
    bullet('src/lib/workflow.ts encodes the allowed status transitions so the review and selection screens stay in sync with the documented process.', { lead: 'Centralised workflow' });
    bullet('Analytics, audit, documents, applications, selection and deficiency data sit behind typed mock modules that can be replaced with API calls.', { lead: 'Isolated mock layer' });
    bullet('The project passes tsc --noEmit, next build and ESLint; components are typed with shared enums from src/types.', { lead: 'Type safety' });
    bullet('The dashboard stats were reworked with a featured total card and a per-status grid for an at-a-glance overview.', { lead: 'Stats layout' });

    section('6 \u00b7 What Is Next');
    bullet('Wire authentication end to end (register, login, roles).');
    bullet('Connect applicant submission and document upload APIs.');
    bullet('Live AI/OCR verification and the eligibility engine.');
    bullet('Applicant response flow for deficiencies.');
    bullet('Server-side data feeding for reports and charts.');

    note('All content is accurate as of the latest commit on feature/admin (3f06869). This is a hackathon prototype running on demo data, not a production system.');
  });
}

function buildAdminGuide() {
  return build(resolve(OUT_DIR, 'admin-dashboard-guide.pdf'), 'Tribal Scholar AI — Admin portal', ({ cover, section, para, bullet, note, table }) => {
    cover(
      'Admin portal \u00b7 user guide',
      'How the Admin Dashboard Works',
      'Tribal Scholar AI \u2014 a practical guide to the admin screens, navigation and review workflows'
    );

    section('1 \u00b7 Signing In');
    para('Start the app with npm run dev, then open /login. Sign in with a demo admin account; every role uses the password demo1234.');
    table(
      ['Role', 'Email', 'Typical abilities'],
      [
        ['Scrutiny Officer', 'scrutiny@demo.com', 'Review applications, verify documents, raise deficiencies'],
        ['Selection Officer', 'selection@demo.com', 'Score candidates and shortlist for selection'],
        ['Administrator', 'admin@demo.com', 'Full access including selection and approvals'],
      ],
      [120, 175, 200],
      { rowColor: INK }
    );
    note('The portal shows a Demo badge on every screen to make it clear this is a hackathon prototype.');

    section('2 \u00b7 Layout and Navigation');
    para('The admin area opens with a left sidebar containing seven sections. On smaller screens the sidebar collapses into a horizontal scrolling pill bar.');
    bullet('Summary of everything: stats, charts, recent applications and flags that need attention.');
    bullet('All applications, with search, filters and the full review page.');
    bullet('Uploaded documents and their AI/OCR verification results.');
    bullet('Issues raised on applications and their resolution.');
    bullet('Candidate scoring and the ranked merit list.');
    bullet('Charts and key performance indicators.');
    bullet('Complete, immutable history of actions.');

    section('3 \u00b7 Dashboard');
    bullet('Shortcuts to the most common tasks.', { lead: 'Quick actions' });
    bullet('A featured total plus application counts grouped by status.', { lead: 'Stats cards' });
    bullet('Approval rate, average processing time and deficiency rate.', { lead: 'KPI strip' });
    bullet('An area chart of weekly submissions over the last six weeks.', { lead: 'Applications received' });
    bullet('A donut chart of the NFST vs NOS share.', { lead: 'Scheme split' });
    bullet('The latest submissions with their current status.', { lead: 'Recent applications' });
    bullet('A bar breakdown across every status.', { lead: 'Status distribution' });
    bullet('Pipeline, selected and deficient counts per scheme.', { lead: 'Per-scheme cards' });
    bullet('Applications flagged with open deficiencies.', { lead: 'Needs attention' });

    section('4 \u00b7 Applications and Review');
    para('Open Applications to see the searchable table. Filter by application number or applicant, scheme, and status, then click Review to open the detail view.');
    bullet('Application number, applicant, scheme, current status, and the allowed next actions. Buttons appear only for transitions the signed-in role may perform.', { lead: 'Header' });
    bullet('Personal, category, tribal, income, education and bank details of the applicant.', { lead: 'Applicant information' });
    bullet('The fields collected by the NFST or NOS application form.', { lead: 'Scheme-specific details' });
    bullet('AI/OCR outcome and confidence for each uploaded document.', { lead: 'Verification results' });
    bullet('Automatic pass, fail or needs-review per eligibility rule.', { lead: 'Eligibility results' });
    bullet('The documents themselves, with per-document status.', { lead: 'Document review' });
    bullet('A timeline of every status change with the actor and remarks.', { lead: 'Status history' });
    note('Advancing an application opens a confirmation dialog that records who acted and stores a remark in the status history.');

    section('5 \u00b7 The Application Pipeline');
    para('Statuses follow the workflow defined in src/lib/workflow.ts. The lifecycle is:');
    bullet('SUBMITTED goes through UNDER DOCUMENT VERIFICATION, then UNDER ELIGIBILITY CHECK.');
    bullet('ELIGIBLE moves to UNDER SCRUTINY; INELIGIBLE ends the process.');
    bullet('UNDER SCRUTINY can raise a DEFICIENT (asks the applicant to correct) or is marked SCRUTINY COMPLETE.');
    bullet('DEFICIENT returns to UNDER SCRUTINY once the applicant responds.');
    bullet('SCRUTINY COMPLETE moves to UNDER SCREENING.');
    bullet('UNDER SCREENING results in SELECTED or REJECTED.');
    bullet('SELECTED is finally APPROVED, or can be REJECTED.');
    note('Applicants can withdraw their own applications while they are DRAFT or SUBMITTED.');

    section('6 \u00b7 Documents');
    bullet('Filter by status, document type, or search by document, application number or applicant.');
    bullet('Each row shows the upload date, scheme, an OCR confidence bar and the verification status.');
    bullet('Inspect opens a modal with the extracted data; a document can be marked Verified or Rejected from there.');

    section('7 \u00b7 Deficiencies');
    bullet('Four summary cards count OPEN, RESPONDED, RESOLVED and REJECTED records.');
    bullet('New Deficiency lets you pick an application and document type and describe the issue.');
    bullet('The review panel opens a record and lets you Resolve or Reject it with remarks.');

    section('8 \u00b7 Selection and Merit List');
    bullet('Totals and a scheme breakdown of the candidate pool.', { lead: 'Selection summary' });
    bullet('Score each candidate against the scheme criteria; the total updates live.', { lead: 'Scoring panel' });
    bullet('Candidates ranked by total score with checkboxes.', { lead: 'Merit list' });
    bullet('Select several candidates and mark them Selected or Rejected in one step.', { lead: 'Bulk actions' });

    section('9 \u00b7 Reports and Analytics');
    bullet('Total applications, approval rate, average processing time and deficiency rate.', { lead: 'KPI cards' });
    bullet('Weekly submissions over the last six weeks.', { lead: 'Applications received' });
    bullet('Share of applications per scheme.', { lead: 'Scheme split' });
    bullet('Applications by applicant state.', { lead: 'Top states' });
    bullet('Full breakdown across every application status.', { lead: 'Status distribution' });

    section('10 \u00b7 Audit Log');
    bullet('A filterable table of every action, including logins, status changes, deficiencies and document decisions.');
    bullet('Each entry shows the actor, role, timestamp and details, so a demo can be reconstructed exactly.');

    section('11 \u00b7 Practical Tips');
    bullet('Everything runs on demo data, so changes last until the page session resets.');
    bullet('The Demo badge marks prototype screens across the portal.');
    bullet('The actions you see depend on the account you signed in with, because transitions are role-gated.');
    bullet('Use the audit log during a demo to retrace exactly what happened.');

    note('Built for the MoTA hackathon prototype. Live APIs will replace the mock layer at integration time (see docs/api.md).');
  });
}

const docs = [
  {
    file: 'what-we-changed-and-improved.pdf',
    build: buildChangesAndImprovements,
  },
  {
    file: 'admin-dashboard-guide.pdf',
    build: buildAdminGuide,
  },
];

for (const d of docs) {
  await d.build();
  console.log('generated', d.file);
}