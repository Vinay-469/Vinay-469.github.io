import { AfterViewInit, Component, ElementRef, OnDestroy, computed, inject, signal } from '@angular/core';

interface Project { id: string; index: string; title: string; eyebrow: string; description: string; tags: string[]; points: string[]; }
interface SkillGroup { name: string; items: string[]; }

@Component({
  selector: 'vk-root',
  standalone: true,
  template: `
    <header class="topbar">
      <a class="wordmark" href="#home" aria-label="Vinay Kumar Kambala, home" [class.is-current]="activeSection() === 'home'" [attr.aria-current]="activeSection() === 'home' ? 'location' : null" (click)="setActiveSection('home')"><span>VK</span></a>
      <button class="menu-toggle" type="button" (click)="menuOpen.set(!menuOpen())" [attr.aria-expanded]="menuOpen()" aria-label="Toggle navigation"><span></span><span></span></button>
      <nav [class.open]="menuOpen()" aria-label="Main navigation">
        @for (item of navItems; track item.href) { <a [href]="item.href" [class.is-current]="activeSection() === item.href.slice(1)" [attr.aria-current]="activeSection() === item.href.slice(1) ? 'location' : null" (click)="setActiveSection(item.href.slice(1)); menuOpen.set(false)">{{ item.label }}</a> }
        <a class="nav-resume" href="/assets/Vinay-Kumar-Kambala-Resume.pdf">Resume <svg class="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7"/></svg></a>
      </nav>
      <button class="theme-toggle" type="button" (click)="toggleTheme()" [attr.aria-label]="dark() ? 'Switch to light theme' : 'Switch to dark theme'" [attr.aria-pressed]="!dark()">@if (dark()) {<svg class="ui-icon theme-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg>} @else {<svg class="ui-icon theme-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z"/></svg>}</button>
    </header>
    <div class="reading-progress" [style.transform]="'scaleX(' + scrollProgress() + ')'" aria-hidden="true"></div>
    <main>
      <section class="hero space-hero wrap" id="home" [class.is-active]="activeSection() === 'home'">
        <button class="recruiter-toggle" type="button" (click)="recruiterMode.set(!recruiterMode())" [attr.aria-expanded]="recruiterMode()" aria-controls="recruiter-panel">Recruiter mode <span>{{ recruiterMode() ? 'On' : 'Off' }}</span></button>
        @if (recruiterMode()) {
          <aside class="recruiter-panel" id="recruiter-panel"><p class="eyebrow">QUICK PROFILE</p><b>.NET Full Stack Developer</b><span>Bengaluru · Immediate joiner</span><div><a href="/assets/Vinay-Kumar-Kambala-Resume.pdf">View resume ?</a><a href="mailto:vinaykambala143@gmail.com">Contact ?</a></div></aside>
        }
        <div class="hero-copy" data-reveal>
          <p class="eyebrow"><span class="status-dot"></span> SOFTWARE ENGINEER <b>·</b> BENGALURU, INDIA</p>
          <h1 aria-label="Hi, I’m Vinay Kumar Kambala, Full Stack Developer"><span aria-hidden="true">{{ typedGreeting() }}</span><em aria-hidden="true">{{ typedName() }}</em><br><span aria-hidden="true">{{ typedSurname() }}</span><br><span aria-hidden="true">{{ typedRole() }}</span><i class="typing-cursor" aria-hidden="true">_</i></h1>
        </div>
        <div class="hero-profile" data-reveal>
          <div class="profile-head"><div class="profile-avatar"><img src="/assets/vinay-profile.png" alt="Vinay Kumar Kambala"></div><div><p class="profile-kicker">PROFILE / 01</p><h2>Vinay Kumar Kambala</h2><p>.NET Full Stack Developer</p></div></div>
          <p class="profile-summary">Building enterprise applications, backend systems, and reliable data platforms.</p>
          <div class="hero-tech" aria-label="Core technologies"><span><b>C#</b><small>LANGUAGE</small></span><span><b>.NET</b><small>BACKEND</small></span><span><b>NG</b><small>ANGULAR</small></span><span><b>SQL</b><small>DATA</small></span><span><b>AI</b><small>INTEGRATION</small></span></div>
          <div class="hero-actions"><a class="button button-primary" href="#projects">Explore projects <svg class="ui-icon action-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8"/></svg></a><a class="button button-quiet" href="#experience">Experience <svg class="ui-icon action-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8"/></svg></a></div>
          <div class="hero-meta"><span><small>01</small> 1+ year experience</span><span><small>02</small> Immediate joiner</span></div>
        </div>
        <div class="space-stage" aria-hidden="true">
          <div class="space-coordinates"><span>EST. 2025 — 2026</span></div>
          <svg class="developer-art" viewBox="0 0 700 430" role="presentation">
            <defs><linearGradient id="stack-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="var(--surface2)" stop-opacity=".94"/><stop offset="1" stop-color="var(--bg)" stop-opacity=".8"/></linearGradient></defs>
            <path class="stack-link" d="M210 132C262 132 257 199 303 199"/><path class="stack-link" d="M398 220C451 220 433 294 480 294"/>
            <path class="stack-link stack-link-soft" d="M210 149C273 149 254 216 303 216M398 237C444 237 439 311 480 311"/>
            <g class="stack-card frontend-card"><rect x="52" y="75" width="160" height="116" rx="12" fill="url(#stack-glass)" stroke="var(--accent)" stroke-opacity=".65"/><path d="M52 103h160" stroke="var(--line)"/><circle cx="70" cy="89" r="3" fill="var(--accent)"/><circle cx="82" cy="89" r="3" fill="var(--accent)" opacity=".55"/><circle cx="94" cy="89" r="3" fill="var(--accent)" opacity=".3"/><path class="code-mark" d="m93 137-12 12 12 12m38-24 12 12-12 12m-8-30-12 36"/><text x="76" y="178" class="stack-label">FRONTEND</text></g>
            <g class="stack-card api-card"><rect x="285" y="160" width="150" height="116" rx="12" fill="url(#stack-glass)" stroke="var(--accent)" stroke-opacity=".78"/><circle class="stack-pulse" cx="360" cy="207" r="25" fill="none" stroke="var(--accent)" stroke-opacity=".55"/><path class="code-mark" d="m351 197-9 10 9 10m18-20 9 10-9 10m-7-25-5 30"/><text x="327" y="254" class="stack-label">API / BACKEND</text></g>
            <g class="stack-card data-card"><rect x="470" y="252" width="166" height="112" rx="12" fill="url(#stack-glass)" stroke="var(--accent)" stroke-opacity=".55"/><ellipse cx="553" cy="280" rx="42" ry="12" fill="none" stroke="var(--accent)" stroke-opacity=".75"/><path d="M511 280v39c0 7 19 13 42 13s42-6 42-13v-39M511 299c0 7 19 13 42 13s42-6 42-13" fill="none" stroke="var(--accent)" stroke-opacity=".65"/><text x="521" y="350" class="stack-label">DATABASE</text></g>
            <circle class="signal-dot signal-one" cx="254" cy="151" r="5"/><circle class="signal-dot signal-two" cx="449" cy="257" r="5"/>
            <g class="floating-code"><path d="m485 83-10 12 10 12m15-24 10 12-10 12"/><text x="115" y="294">&lt;/&gt;</text><path d="m568 166-6 34m17-34-6 34m-17-23h25m-27 12h25"/></g>
          </svg>
          <div class="space-caption"><span>ENGINEERING WITH INTENT</span><span>BENGALURU / INDIA</span></div>
        </div>
      </section>
      <div class="ticker" aria-label="Areas of focus"><div>BACKEND ENGINEERING <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg> ANGULAR <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg> MICROSERVICES <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg> DATA INGESTION <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg> CLEAN ARCHITECTURE <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg> REAL-TIME SYSTEMS <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg> BACKEND ENGINEERING <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg> ANGULAR <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg> MICROSERVICES <svg class="ticker-spark" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5 9.3 6.7 14.5 8l-5.2 1.3L8 14.5l-1.3-5.2L1.5 8l5.2-1.3L8 1.5Z"/></svg></div></div>
      <section class="section wrap" id="about" [class.is-active]="activeSection() === 'about'">
        <div class="section-head" data-reveal><p class="eyebrow">01 / ABOUT</p><h2>Engineering with<br><em>clarity and care.</em></h2></div>
        <div class="about-body" data-reveal><p class="about-lede">Software Engineer at Endava with 1+ year of experience building enterprise applications using C#, ASP.NET Core, Angular, and SQL Server.</p><p>My work spans microservice-based application development and high-volume data ingestion. I’ve worked on secure REST APIs, batch database processing, AI-assisted metadata analysis, real-time communication, automated testing, and structured logging.</p><div class="about-facts"><div><span>BASED IN</span><b>Bengaluru, India</b></div><div><span>EDUCATION</span><b>B.Tech · ECE</b></div><div><span>AVAILABILITY</span><b>Immediate joiner</b></div></div></div>
      </section>
      <section class="section experience-section" id="experience" [class.is-active]="activeSection() === 'experience'"><div class="wrap"><div class="section-head" data-reveal><p class="eyebrow">02 / EXPERIENCE</p><h2>Work shaped by<br><em>real systems.</em></h2></div>
        <article class="role-block" data-reveal><div class="role-summary"><span class="role-mark">E</span><div><h3>Software Engineer</h3><p>Endava</p></div><span class="role-dates">AUG 2025 — SEP 2026</span></div>
          <div class="engagements">@for (project of projects; track project.id) {<article class="engagement"><div class="engagement-index">{{ project.index }}</div><div class="engagement-content"><p class="eyebrow">PROJECT ENGAGEMENT</p><h3>{{ project.title }}</h3><p class="engagement-desc">{{ project.description }}</p><ul>@for (point of project.points; track point) {<li>{{ point }}</li>}</ul><div class="tags">@for (tag of project.tags; track tag) {<span>{{ tag }}</span>}</div></div></article>}</div>
        </article></div></section>
      <section class="section wrap" id="projects" [class.is-active]="activeSection() === 'projects'"><div class="section-head" data-reveal><p class="eyebrow">03 / SELECTED WORK</p><h2>Complexity, made<br><em>workable.</em></h2></div><div class="project-tools"><label class="project-search"><svg class="search-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input type="search" placeholder="Search projects or technologies" aria-label="Search projects or technologies" [value]="projectQuery()" (input)="projectQuery.set($any($event.target).value)"></label><div class="project-filters" aria-label="Filter projects">@for (filter of projectFilters; track filter) {<button type="button" [class.selected]="activeProjectFilter() === filter" [attr.aria-pressed]="activeProjectFilter() === filter" (click)="activeProjectFilter.set(filter)">{{ filter }}</button>}</div><span class="project-count">{{ filteredProjects().length }} PROJECT{{ filteredProjects().length === 1 ? '' : 'S' }}</span></div><div class="project-grid">@for (project of filteredProjects(); track project.id) {<article class="project-card" data-reveal><div class="card-top"><span>{{ project.index }} / CASE STUDY</span><span>ENDAVA</span></div>@if (project.id === 'ingestion' || project.id === 'banking') {<h3><a class="project-repo-link" [href]="project.id === 'ingestion' ? 'https://github.com/Vinay-469/Data-Ingestion-Platform' : 'https://github.com/Vinay-469/Digital-Banking-Platform/tree/main'" target="_blank" rel="noopener noreferrer" title="Open this project on GitHub">{{ project.title }} <span aria-hidden="true">?</span></a></h3>} @else {<h3>{{ project.title }}</h3>}<p>{{ project.description }}</p><div class="tags">@for (tag of project.tags.slice(0, 5); track tag) {<span>{{ tag }}</span>}</div>@if (project.id === 'ingestion' || project.id === 'banking') {<a class="project-repo-cta" [href]="project.id === 'ingestion' ? 'https://github.com/Vinay-469/Data-Ingestion-Platform' : 'https://github.com/Vinay-469/Digital-Banking-Platform/tree/main'" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub, opens in a new tab"><svg class="github-mark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8A11.2 11.2 0 0 0 8.46 22.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.29-1.2-1.63-1.2-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.77 1.95 3.72 1.37.1-.71.39-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0c2.13-1.44 3.07-1.14 3.07-1.14.62 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg><span>View source code on GitHub</span><span class="repo-external" aria-hidden="true">?</span></a>}<details><summary>Explore engineering details <span>+</span></summary><div class="detail-body"><p class="eyebrow">ENGINEERING APPROACH</p><ul>@for (point of project.points; track point) {<li>{{ point }}</li>}</ul><p class="concept-label">Conceptual illustration · architecture details reflect the resume description.</p></div></details></article>} @empty {<p class="empty-projects">No projects match that search. Try another technology or clear the filters.</p>}</div></section>
      <section class="architecture-section" id="architecture" [class.is-active]="activeSection() === 'architecture'"><div class="wrap"><div class="section-head" data-reveal><p class="eyebrow">04 / SYSTEMS THINKING</p><h2>Architecture as<br><em>a working model.</em></h2></div><div class="architecture-grid"><article class="architecture-card" data-reveal><div class="card-top"><span>ILLUSTRATIVE / 01</span><span>BANKING PLATFORM</span></div><h3>Service-oriented architecture</h3><p>Conceptual view based on the resume description.</p><div class="flow"><span>Angular<br>Frontend</span><svg class="flow-arrow" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17m-5-5 5 5-5 5"/></svg><span>API<br>Gateway</span><svg class="flow-arrow" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17m-5-5 5 5-5 5"/></svg><span>Backend<br>Microservices</span><svg class="flow-arrow" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17m-5-5 5 5-5 5"/></svg><span>Separate<br>Databases</span></div><div class="service-list">Identity · Branches · Accounts · Cards · Transactions · Loans · Notifications · Support</div></article><article class="architecture-card" data-reveal><div class="card-top"><span>ILLUSTRATIVE / 02</span><span>DATA INGESTION</span></div><h3>From files to validated data</h3><p>Conceptual processing flow based on the resume description.</p><div class="flow flow-pipeline"><span>File<br>Upload</span><svg class="flow-arrow" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17m-5-5 5 5-5 5"/></svg><span>Parse &<br>Validate</span><svg class="flow-arrow" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17m-5-5 5 5-5 5"/></svg><span>Stage &<br>Persist</span><svg class="flow-arrow" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17m-5-5 5 5-5 5"/></svg><span>Map &<br>Process</span></div><div class="service-list">Metadata analysis · Duplicate detection · Status updates · Structured logging</div></article></div></div></section>
      <section class="section wrap" id="skills" [class.is-active]="activeSection() === 'skills'"><div class="section-head" data-reveal><p class="eyebrow">05 / TECHNICAL RANGE</p><h2>Tools for the<br><em>whole system.</em></h2><p class="section-note">Technologies and practices represented in the resume. .NET 10 appears in the professional summary; .NET 8 is listed for the ingestion project.</p></div><div class="skills-grid">@for (group of skillGroups; track group.name) {<article class="skill-group" data-reveal><span class="skill-number">{{ group.name.slice(0, 2).toUpperCase() }}</span><h3>{{ group.name }}</h3><div class="skill-items">@for (skill of group.items; track skill) {<span>{{ skill }}</span>}</div></article>}</div></section>
      <section class="contact-section" id="contact" [class.is-active]="activeSection() === 'contact'"><div class="wrap contact-inner" data-reveal><div><p class="eyebrow">06 / CONTACT</p><h2>Let’s build<br><em>something considered.</em></h2><p class="contact-lede">For opportunities and professional conversations, reach out directly.</p><a class="button button-primary" href="mailto:vinaykambala143@gmail.com">Start a conversation <svg class="ui-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7"/></svg></a></div><div class="contact-links"><a href="mailto:vinaykambala143@gmail.com"><span>EMAIL</span><b>vinaykambala143&#64;gmail.com</b><svg class="ui-icon contact-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7"/></svg></a><a href="tel:+919948010776"><span>PHONE</span><b>+91 99480 10776</b><svg class="ui-icon contact-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7"/></svg></a><a href="https://www.linkedin.com/in/vinaykumar469" target="_blank" rel="noopener noreferrer"><span>LINKEDIN</span><b>vinaykumar469</b><svg class="ui-icon contact-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5 4h7v7"/></svg></a><div><span>LOCATION</span><b>Bengaluru, India</b></div></div></div></section>
    </main>
    <footer class="footer wrap"><a class="wordmark" href="#home"><span>VK</span></a><p>Vinay Kumar Kambala<br><small>.NET Full Stack Developer</small></p><a href="#home" class="back-top">BACK TO TOP <svg class="ui-icon backtop-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 14V2m-5 5 5-5 5 5"/></svg></a><span class="copyright">© {{ year }} VINAY KUMAR KAMBALA</span></footer>
  `,
  styles: [`
    :host { display:block; }
    .photo-placeholder {
      position: absolute;
      inset: 58px 52px 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      border: 1px dashed var(--line);
      background: color-mix(in srgb, var(--surface2) 45%, transparent);
      text-align: center;
    }
    .profile-photo {
      position: absolute;
      z-index: 1;
      left: 50%;
      bottom: 0;
      width: auto;
      height: 76%;
      max-width: 84%;
      transform: translateX(-50%);
      object-fit: contain;
      object-position: center bottom;
      filter: drop-shadow(0 14px 26px rgba(0, 0, 0, .24));
      -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 93%, rgba(0, 0, 0, .7) 98%, transparent 100%);
      mask-image: linear-gradient(to bottom, #000 0%, #000 93%, rgba(0, 0, 0, .7) 98%, transparent 100%);
    }
    .hero {
      min-height: min(680px, calc(100svh - 78px));
      grid-template-columns: minmax(0, 1.15fr) minmax(240px, .58fr);
      align-items: center;
      gap: clamp(28px, 4vw, 60px);
      padding-block: 48px 52px;
    }
    .hero-copy { max-width: 700px; }
    .hero h1 {
      max-width: 760px;
      font-size: clamp(42px, 4.25vw, 68px);
      line-height: 1.04;
      margin: 20px 0 22px;
    }
    .hero-lede { max-width: 480px; font-size: 15px; }
    .hero-visual.photo-visual {
      width: min(100%, 320px);
      height: 380px;
      justify-self: center;
      margin-inline: auto;
      overflow: visible;
      border: 0;
      background: radial-gradient(ellipse at 50% 72%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 68%);
    }
    .photo-visual::before {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      width: min(74%, 238px);
      height: 84%;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      border: 1px solid color-mix(in srgb, var(--accent) 20%, var(--line));
      border-radius: 48% 48% 3px 3px / 24% 24% 3px 3px;
      background: linear-gradient(180deg, color-mix(in srgb, var(--accent) 7%, var(--surface)) 0%, color-mix(in srgb, var(--surface) 15%, transparent) 72%, transparent 100%);
      pointer-events: none;
    }
    .photo-icon {
      width: 48px;
      height: 48px;
      fill: none;
      stroke: var(--accent);
      stroke-linecap: round;
      stroke-width: 1.5;
      opacity: .75;
    }
    .photo-placeholder-label {
      color: var(--text);
      font: 10px 'DM Mono', monospace;
      letter-spacing: .14em;
    }
    .photo-placeholder-note {
      color: var(--muted);
      font: 10px 'DM Sans', sans-serif;
    }
    .hero .status-dot {
      animation: status-pulse 2.4s ease-in-out infinite;
    }
    .photo-visual::after { display: none; }
    .photo-placeholder {
      z-index: 1;
      animation: placeholder-border 4s ease-in-out infinite;
    }
    .photo-icon {
      animation: photo-icon-float 3.4s ease-in-out infinite;
    }
    .button-primary {
      transition: transform .25s, box-shadow .25s, background .25s;
    }
    .button-primary:hover {
      box-shadow: 0 10px 28px color-mix(in srgb, var(--accent) 25%, transparent);
    }
    .tags span {
      transition: color .2s, border-color .2s, background .2s, transform .2s;
    }
    .tags span:hover {
      color: var(--text);
      border-color: color-mix(in srgb, var(--accent) 60%, var(--line));
      background: color-mix(in srgb, var(--accent) 8%, transparent);
      transform: translateY(-2px);
    }
    @keyframes status-pulse {
      50% { box-shadow: 0 0 0 7px color-mix(in srgb, var(--accent) 5%, transparent); }
    }
    @keyframes photo-glow {
      from { opacity: .45; transform: scale(.96); }
      to { opacity: 1; transform: scale(1.04); }
    }
    @keyframes placeholder-border {
      50% { border-color: color-mix(in srgb, var(--accent) 38%, var(--line)); }
    }
    @keyframes photo-icon-float {
      50% { transform: translateY(-5px); }
    }
    @media (max-width: 850px) {
      .hero {
        min-height: unset;
        grid-template-columns: minmax(0, 1fr) minmax(220px, .58fr);
        gap: 24px;
      }
      .hero-visual.photo-visual { height: 340px; }
      .hero-meta { flex-wrap: wrap; gap: 10px 14px; }
    }
    .topbar nav a.is-current:not(.nav-resume) {
      color: var(--accent);
    }
    .topbar nav a.is-current:not(.nav-resume)::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: -8px;
      left: 0;
      height: 2px;
      background: var(--accent);
      animation: active-link-in .25s ease-out both;
    }
    .topbar nav a:not(.nav-resume) { position: relative; }
    .wordmark.is-current span {
      border-color: var(--accent);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 12%, transparent);
      transition: border-color .25s, box-shadow .25s;
    }
    .section.is-active .section-head > .eyebrow,
    .architecture-section.is-active .section-head > .eyebrow,
    .contact-section.is-active .contact-inner > div:first-child > .eyebrow {
      width: fit-content;
      padding: 5px 9px;
      border-left: 2px solid var(--accent);
      background: color-mix(in srgb, var(--accent) 9%, transparent);
      transition: background .3s, padding .3s;
    }
    .reveal-ready {
      opacity: 0;
      transform: translateY(22px);
      transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1);
    }
    .reveal-ready.is-visible {
      opacity: 1;
      transform: translateY(0);
    }
    .project-card.reveal-ready:nth-child(2),
    .architecture-card.reveal-ready:nth-child(2),
    .skill-group.reveal-ready:nth-child(even) {
      transition-delay: .12s;
    }
    @keyframes active-link-in {
      from { transform: scaleX(.2); opacity: .3; }
      to { transform: scaleX(1); opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal-ready, .reveal-ready.is-visible { opacity: 1; transform: none; transition: none; }
      .topbar nav a.is-current:not(.nav-resume)::after { animation: none; }
      .hero .status-dot, .photo-visual::after, .photo-placeholder, .photo-icon { animation: none; }
      .button-primary, .tags span { transition: none; }
      .button-primary:hover, .tags span:hover { transform: none; }
    }
    @media (max-width: 520px) {
      .hero { min-height: unset; grid-template-columns: 1fr; gap: 22px; padding-block: 46px 40px; }
      .hero h1 { font-size: clamp(32px, 8.5vw, 40px); line-height: 1.02; }
      .hero-visual.photo-visual { height: 280px; }
      .profile-photo { height: 70%; max-width: 82%; }
    }
  `]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly observers: IntersectionObserver[] = [];
  private typingTimeout?: ReturnType<typeof setTimeout>;
  readonly year = new Date().getFullYear();
  constructor() {
    const preference = localStorage.getItem('vk-theme');
    const selected = preference ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    this.dark.set(selected !== 'light');
    document.documentElement.dataset['theme'] = selected;
  }
  readonly dark = signal(true);
  readonly recruiterMode = signal(false);
  readonly typedGreeting = signal('');
  readonly typedName = signal('');
  readonly typedSurname = signal('');
  readonly typedRole = signal('');
  readonly scrollProgress = signal(0);
  readonly projectQuery = signal('');
  readonly activeProjectFilter = signal('All');
  readonly projectFilters = ['All', 'Full stack', 'Data & AI'];
  readonly filteredProjects = computed(() => {
    const query = this.projectQuery().trim().toLowerCase();
    return this.projects.filter(project => {
      const categoryMatches = this.activeProjectFilter() === 'All' ||
        (this.activeProjectFilter() === 'Full stack' && project.id === 'banking') ||
        (this.activeProjectFilter() === 'Data & AI' && project.id === 'ingestion');
      const queryMatches = !query || `${project.title} ${project.description} ${project.tags.join(' ')} ${project.points.join(' ')}`.toLowerCase().includes(query);
      return categoryMatches && queryMatches;
    });
  });
  private readonly onScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
  };
  readonly menuOpen = signal(false);
  readonly activeSection = signal('home');
  readonly navItems = [{label:'About',href:'#about'},{label:'Experience',href:'#experience'},{label:'Projects',href:'#projects'},{label:'Systems',href:'#architecture'},{label:'Skills',href:'#skills'},{label:'Contact',href:'#contact'}];
  readonly projects: Project[] = [
    {id:'banking', index:'01', title:'Digital Banking Platform', eyebrow:'MICROSERVICES · FULL STACK', description:'A full-stack banking application supporting accounts, cards, transactions, loans, and customer support.', tags:['Angular','ASP.NET Core','SQL Server','Microservices','API Gateway','Clean Architecture'], points:['Designed services for identity, branches, accounts, cards, transactions, loans, notifications, and support.','Applied Clean Architecture with separate databases for the described services.','Integrated an API Gateway to centralize request routing between the Angular frontend and backend microservices.']},
    {id:'ingestion', index:'02', title:'Enterprise Generic Data Ingestion Platform', eyebrow:'DATA ENGINEERING · AI', description:'A high-volume ingestion platform combining multi-format file processing, database batch persistence, and metadata-driven mapping.', tags:['Angular','.NET 8','EF Core','SqlBulkCopy','SignalR','Gemini AI'], points:['Built staged batch persistence using SqlBulkCopy, SQL stored procedures, and EF Core.','Implemented parsing and validation for XLSX, XLS, CSV, TSV, TXT, JSON, XML, PDF, DOCX, and ZIP, including duplicate and datatype checks.','Integrated Gemini AI for metadata-only schema analysis, semantic column mapping, confidence scoring, and relationship detection.','Implemented JWT/RBAC, CORS, ownership validation, SignalR, NUnit/Jasmine testing, and Serilog logging.']}
  ];
  readonly skillGroups: SkillGroup[] = [
    {name:'Backend',items:['C#','.NET 8','.NET 10*','ASP.NET Core','REST APIs']}, {name:'Frontend',items:['Angular','TypeScript','RxJS','HTML','CSS']}, {name:'Databases',items:['SQL Server','Entity Framework Core','SQL Stored Procedures']}, {name:'Data Engineering',items:['Bulk Ingestion','SqlBulkCopy','Batch Processing','Multi-format Parsing']}, {name:'AI & Integration',items:['Gemini AI','Metadata-only Schema Analysis','Column Mapping']}, {name:'Security',items:['JWT','RBAC','CORS','File Ownership Authorization']}, {name:'Real-time & Observability',items:['SignalR','Serilog','SQL / Application / Error Logging']}, {name:'Testing & Performance',items:['NUnit','Jasmine','High-volume Data Processing','Performance Optimization']}, {name:'DevOps',items:['Docker','PowerShell','CI/CD Concepts']}
  ];
  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.onScroll();
    this.startTypewriter();
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = this.host.nativeElement.querySelectorAll<HTMLElement>('main > section[id]');
    const sectionObserver = new IntersectionObserver(entries => {
      const visibleSections = entries.filter(entry => entry.isIntersecting);
      if (visibleSections.length) {
        const current = visibleSections.reduce((nearest, entry) =>
          Math.abs(entry.boundingClientRect.top - window.innerHeight * 0.3) <
          Math.abs(nearest.boundingClientRect.top - window.innerHeight * 0.3) ? entry : nearest
        );
        this.activeSection.set((current.target as HTMLElement).id);
      }
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
    this.observers.push(sectionObserver);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12 });
    this.host.nativeElement.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
      element.classList.add('reveal-ready');
      revealObserver.observe(element);
    });
    this.observers.push(revealObserver);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    this.observers.forEach(observer => observer.disconnect());
  }

  private startTypewriter(): void {
    const segments = [
      { target: this.typedGreeting, text: 'Hi, I’m ' },
      { target: this.typedName, text: 'Vinay' },
      { target: this.typedSurname, text: 'Kumar Kambala' },
      { target: this.typedRole, text: 'Full Stack Developer' }
    ];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      segments.forEach(segment => segment.target.set(segment.text));
      return;
    }
    let segmentIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    const typeNext = () => {
      const segment = segments[segmentIndex];
      if (deleting) {
        characterIndex -= 1;
        segment.target.set(segment.text.slice(0, characterIndex));
        if (characterIndex <= 0) {
          segmentIndex -= 1;
          if (segmentIndex < 0) {
            deleting = false;
            segmentIndex = 0;
            characterIndex = 0;
            this.typingTimeout = setTimeout(typeNext, 420);
            return;
          }
          characterIndex = segments[segmentIndex].text.length;
          this.typingTimeout = setTimeout(typeNext, 70);
          return;
        }
        this.typingTimeout = setTimeout(typeNext, 34);
      } else {
        characterIndex += 1;
        segment.target.set(segment.text.slice(0, characterIndex));
        if (characterIndex >= segment.text.length) {
          segmentIndex += 1;
          characterIndex = 0;
          if (segmentIndex >= segments.length) {
            deleting = true;
            segmentIndex = segments.length - 1;
            characterIndex = segments[segmentIndex].text.length;
            this.typingTimeout = setTimeout(typeNext, 1500);
            return;
          }
          this.typingTimeout = setTimeout(typeNext, 230);
        } else {
          this.typingTimeout = setTimeout(typeNext, 68);
        }
      }
    };
    this.typingTimeout = setTimeout(typeNext, 420);
  }

  setActiveSection(section: string): void {
    this.activeSection.set(section);
  }

  toggleTheme(): void { this.dark.update(value => !value); const theme = this.dark() ? 'dark' : 'light'; document.documentElement.dataset['theme'] = theme; localStorage.setItem('vk-theme', theme); }
}
