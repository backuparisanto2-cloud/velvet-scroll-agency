Apply two visual consistency fixes across the site: (1) make all section headings share the Technology Partners gradient title treatment, and (2) make Work/Portfolio images stay sharp by using the same overlay and contrast approach as Services.

### 1. Section heading color consistency
**Current state**
- Technology Partners title (`Clients.tsx`) uses a split style: base word is `text-foreground`, accent word uses `bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent`.
- Other section headings (About, Services, Tools, Work, Events, Contact) currently use plain `text-foreground`.

**Goal**
Make every section `h2` title match the Technology Partners color treatment by adding a gradient accent to the most prominent keyword.

**Implementation**
- Update `src/i18n/dictionaries.ts` for both `id` and `en` to split each section title into `title` and `titleAccent`:
  - About: "Dipercaya oleh Ratusan Perusahaan" / "Trusted by Hundreds of Companies" → accent on "Perusahaan" / "Companies"
  - Services: "Layanan Infrastruktur IT Profesional" / "Professional IT Infrastructure Services" → accent on "Infrastruktur IT" / "IT Infrastructure"
  - Tools: "Network Tools" → accent on "Tools"
  - Work: "Portfolio Project" / "Project Portfolio" → accent on "Project" / "Portfolio"
  - Events: "Event & Kegiatan" / "Events & Activities" → accent on "Kegiatan" / "Activities"
  - Contact: "Hubungi Kami" / "Get in Touch" → accent on "Kami" / "Touch"
- Update `About.tsx`, `Services.tsx`, `Tools.tsx`, `Work.tsx`, `Events.tsx`, and `Contact.tsx` to render the split title with the same gradient utility classes as `Clients.tsx`.
- Verify the gradient reads well in both dark and light mode. If needed, switch the gradient to a slightly stronger set on light mode (e.g., `from-blue-500 to-purple-600`) while keeping the dark mode look unchanged.
- Test title wrapping on mobile so the accent word still breaks naturally when the line wraps.

### 2. Work/Portfolio image sharpness
**Current state**
- `Work.tsx` uses a full dark overlay (`bg-gradient-to-t from-black/92 via-black/50 to-black/10`) across each card, which dims the image and makes it look less sharp.
- `Services.tsx` already uses a better approach: a bottom-only gradient (`bg-gradient-to-t from-background/70 to-transparent`) and subtle contrast/saturate adjustments (`contrast-[1.06] saturate-[1.05]`).

**Goal**
Apply the same sharp-image treatment from Services to Work/Portfolio cards so the project photos remain vivid and readable text still sits cleanly on top.

**Implementation**
- Replace the full dark overlay in `Work.tsx` with a bottom-only gradient, similar to Services: `bg-gradient-to-t from-background/80 via-background/20 to-transparent` (or from-black for the dark images, but with reduced opacity).
- Add `contrast-[1.06] saturate-[1.05]` to the project images to improve perceived sharpness.
- Keep the text color legible: since the overlay is lighter, the text on the image must still stand out. Use a stronger bottom gradient scrim and add `drop-shadow` to the text if it is not already sufficient.
- Ensure the mobile layout (always-visible description) remains readable after the overlay change.
- Maintain the hover zoom effect (`scale-105`) and flex-accordion behavior on desktop.

### Verification
- Preview at 384px and 1280px viewports to confirm both title gradients and sharper project images look consistent in dark and light modes.
- Check that no text becomes hard to read against the new lighter Work card overlay.