import { type SVGProps } from 'react';

export type NavIconName =
  | 'dashboard'
  | 'applications'
  | 'documents'
  | 'deficiencies'
  | 'selection'
  | 'reports'
  | 'audit'
  | 'profile'
  | 'schemes'
  | 'notifications';

const PATHS: Record<NavIconName, string[]> = {
  dashboard: ['M4 5.5A1.5 1.5 0 0 1 5.5 4h4A1.5 1.5 0 0 1 11 5.5v4A1.5 1.5 0 0 1 9.5 11h-4A1.5 1.5 0 0 1 4 9.5v-4Z', 'M13 5.5A1.5 1.5 0 0 1 14.5 4h4A1.5 1.5 0 0 1 20 5.5v7A1.5 1.5 0 0 1 18.5 14h-4A1.5 1.5 0 0 1 13 12.5v-7Z', 'M4 14.5A1.5 1.5 0 0 1 5.5 13h4A1.5 1.5 0 0 1 11 14.5v4A1.5 1.5 0 0 1 9.5 20h-4A1.5 1.5 0 0 1 4 18.5v-4Z', 'M13 17.5A1.5 1.5 0 0 1 14.5 16h4a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-1Z'],
  applications: ['M14 3v4a1 1 0 0 0 1 1h4', 'M5 8a2 2 0 0 1 2-2h7l5 5v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z', 'M9 13h6', 'M9 17h4'],
  documents: ['M4 6a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z', 'M9.5 13.5l2 2 3.5-4'],
  deficiencies: ['M12 4.5 3.5 19h17L12 4.5Z', 'M12 10v4', 'M12 16.5h.01'],
  selection: ['M12 3.5 14.3 9l5.7.4-4.4 3.8 1.4 5.6L12 15.9l-5 2.9 1.4-5.6L4 9.4 9.7 9 12 3.5Z'],
  reports: ['M4 20h16', 'M7 20V11', 'M12 20V5', 'M17 20v-6'],
  audit: ['M12 3.5 5 6.2v5.1c0 4.2 2.8 7.6 7 9.2 4.2-1.6 7-5 7-9.2V6.2L12 3.5Z', 'M9.5 12l1.8 1.8 3.4-3.6'],
  profile: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M5 20a7 7 0 0 1 14 0'],
  schemes: ['M4 5.5A1.5 1.5 0 0 1 5.5 4h3A1.5 1.5 0 0 1 10 5.5v3A1.5 1.5 0 0 1 8.5 10h-3A1.5 1.5 0 0 1 4 8.5v-3Z', 'M14 5.5A1.5 1.5 0 0 1 15.5 4h3A1.5 1.5 0 0 1 20 5.5v3A1.5 1.5 0 0 1 18.5 10h-3A1.5 1.5 0 0 1 14 8.5v-3Z', 'M4 15.5A1.5 1.5 0 0 1 5.5 14h3A1.5 1.5 0 0 1 10 15.5v3A1.5 1.5 0 0 1 8.5 20h-3A1.5 1.5 0 0 1 4 18.5v-3Z', 'M14 15.5A1.5 1.5 0 0 1 15.5 14h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-3Z'],
  notifications: ['M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6Z', 'M10.5 19a1.7 1.7 0 0 0 3 0'],
};

function iconNameFor(href: string): NavIconName {
  if (href.includes('profile')) return 'profile';
  if (href.includes('schemes')) return 'schemes';
  if (href.includes('notifications')) return 'notifications';
  if (href.includes('documents')) return 'documents';
  if (href.includes('deficiencies')) return 'deficiencies';
  if (href.includes('selection')) return 'selection';
  if (href.includes('reports')) return 'reports';
  if (href.includes('audit')) return 'audit';
  if (href.includes('applications')) return 'applications';
  return 'dashboard';
}

interface NavIconProps extends SVGProps<SVGSVGElement> {
  href: string;
}

export default function NavIcon({ href, ...props }: NavIconProps) {
  const paths = PATHS[iconNameFor(href)];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
