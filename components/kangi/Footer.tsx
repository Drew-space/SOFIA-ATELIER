// import Link from "next/link";
// import {
//   RiMailLine,
//   RiTelegramLine,
//   RiInstagramLine,
//   RiFacebookCircleLine,
//   RiTiktokLine,
//   RiPinterestLine,
//   RiTwitterXLine,
//   RiThreadsLine,
//   RiYoutubeLine,
//   RiGlobalLine,
// } from "@remixicon/react";
// import type { RemixiconComponentType } from "@remixicon/react";
// import { fetchQuery } from "convex/nextjs";
// import { api } from "@/convex/_generated/api";

// const currentYear = new Date().getFullYear();

// const FOOTER_COLS = [
//   {
//     title: "Help",
//     links: ["Contact Us", "Size Guide"],
//   },
//   {
//     title: "Info",
//     links: ["About Us", "Terms & Conditions", "Privacy & Cookie Policy"],
//   },
// ];

// // Maps a lowercase platform name to its icon — add new platforms
// // to the Convex schema's socialLinks list and they'll render automatically.
// const ICONS: Record<string, RemixiconComponentType> = {
//   instagram: RiInstagramLine,
//   facebook: RiFacebookCircleLine,
//   tiktok: RiTiktokLine,
//   pinterest: RiPinterestLine,
//   x: RiTwitterXLine,
//   twitter: RiTwitterXLine,
//   threads: RiThreadsLine,
//   youtube: RiYoutubeLine,
// };

// export default async function Footer() {
//   const settings = await fetchQuery(api.siteSettings.get);

//   return (
//     <footer
//       className="px-6 md:px-12 pt-16 pb-10"
//       style={{ background: "var(--black)", color: "var(--white)" }}
//     >
//       <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">
//         {/* Brand */}
//         <div>
//           <span
//             className="font-display text-3xl tracking-widest"
//             style={{ color: "var(--white)" }}
//           >
//             SOFIA ATELIER
//           </span>
//           <p className="text-white/40 text-xs tracking-wide mt-3 max-w-xs leading-relaxed">
//             A house built on permanence. Premium materials, considered
//             construction, made without compromise.
//           </p>
//         </div>

//         {/* Link columns */}
//         <div className="grid grid-cols-2 gap-8 text-xs tracking-wider">
//           {FOOTER_COLS.map((col) => (
//             <div key={col.title}>
//               <p
//                 className="font-display text-[10px] tracking-[0.3em] uppercase mb-4"
//                 style={{ color: "var(--stone)" }}
//               >
//                 {col.title}
//               </p>
//               <ul className="space-y-2">
//                 {col.links.map((l) => (
//                   <li key={l}>
//                     <a
//                       href="#"
//                       className="text-white/50 hover:text-white/90 transition-colors"
//                     >
//                       {l}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom bar */}
//       <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-wider text-white/30">
//         <span>© {currentYear} SOFIA ATELIER. All rights reserved.</span>

//         <div className="flex items-center gap-5">
//           {settings?.email && (
//             <a
//               href={`mailto:${settings.email}`}
//               className="hover:text-white/70 transition-colors flex items-center gap-2"
//             >
//               <RiMailLine size={16} />
//               <span className="hidden sm:inline">{settings.email}</span>
//             </a>
//           )}

//           {settings?.telegramUsername && (
//             <a
//               href={`https://t.me/${settings.telegramUsername.replace("@", "")}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-white/70 transition-colors flex items-center gap-2"
//             >
//               <RiTelegramLine size={16} />
//               <span className="hidden sm:inline">
//                 {settings.telegramUsername}
//               </span>
//             </a>
//           )}

//           {settings?.socialLinks?.map((social) => {
//             const Icon = ICONS[social.platform.toLowerCase()] || RiGlobalLine;
//             return (
//               <a
//                 key={social.platform}
//                 href={social.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white/70 transition-colors"
//                 aria-label={social.platform}
//               >
//                 <Icon size={16} />
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </footer>
//   );
// }

import {
  RiMailLine,
  RiTelegramLine,
  RiInstagramLine,
  RiFacebookCircleLine,
  RiTiktokLine,
  RiPinterestLine,
  RiTwitterXLine,
  RiThreadsLine,
  RiYoutubeLine,
  RiGlobalLine,
} from "@remixicon/react";
import type { RemixiconComponentType } from "@remixicon/react";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const currentYear = new Date().getFullYear();

const FOOTER_COLS = [
  {
    title: "Help",
    links: ["Contact Us", "Size Guide"],
  },
  {
    title: "Info",
    links: ["About Us", "Terms & Conditions", "Privacy & Cookie Policy"],
  },
];

// Maps a lowercase platform name to its icon — add new platforms
// to the Convex schema's socialLinks list and they'll render automatically.
const ICONS: Record<string, RemixiconComponentType> = {
  instagram: RiInstagramLine,
  facebook: RiFacebookCircleLine,
  tiktok: RiTiktokLine,
  pinterest: RiPinterestLine,
  x: RiTwitterXLine,
  twitter: RiTwitterXLine,
  threads: RiThreadsLine,
  youtube: RiYoutubeLine,
};

export default async function Footer() {
  const settings = await fetchQuery(api.siteSettings.get);

  const email = settings?.email ?? "kimsofia0008@gmail.com";
  const telegramUsername = settings?.telegramUsername ?? "@sofia08500";

  return (
    <footer
      className="px-6 md:px-12 pt-16 pb-10"
      style={{ background: "var(--black)", color: "var(--white)" }}
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 mb-16">
        {/* Brand */}
        <div>
          <span
            className="font-display text-3xl tracking-widest"
            style={{ color: "var(--white)" }}
          >
            SOFIA ATELIER
          </span>
          <p className="text-white/40 text-xs tracking-wide mt-3 max-w-xs leading-relaxed">
            A house built on permanence. Premium materials, considered
            construction, made without compromise.
          </p>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 text-xs tracking-wider">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p
                className="font-display text-[10px] tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--stone)" }}
              >
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-white/50 hover:text-white/90 transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-wider text-white/30">
        <span>© {currentYear} SOFIA ATELIER. All rights reserved.</span>

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${email}`}
            className="hover:text-white/70 transition-colors flex items-center gap-2"
          >
            <RiMailLine size={16} />
            <span className="hidden sm:inline">{email}</span>
          </a>

          <a
            href={`https://t.me/${telegramUsername.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors flex items-center gap-2"
          >
            <RiTelegramLine size={16} />
            <span className="hidden sm:inline">{telegramUsername}</span>
          </a>

          {settings?.socialLinks?.map((social) => {
            const Icon = ICONS[social.platform.toLowerCase()] || RiGlobalLine;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
                aria-label={social.platform}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
