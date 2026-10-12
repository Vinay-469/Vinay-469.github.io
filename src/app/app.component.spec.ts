import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false, addListener: () => undefined, removeListener: () => undefined }));
    localStorage.clear();
    document.documentElement.dataset['theme'] = '';
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('renders the profile and both resume-supported project case studies', () => {
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Vinay Kumar Kambala');
    expect(text).toContain('Digital Banking Platform');
    expect(text).toContain('Enterprise Generic Data Ingestion Platform');
  });

  it('renders the VK wordmark without an accent dot', () => {
    const wordmarks: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('.wordmark');
    expect(wordmarks.length).toBe(2);
    wordmarks.forEach(wordmark => {
      expect(wordmark.textContent?.trim()).toBe('VK');
      expect(wordmark.querySelector('i')).toBeNull();
    });
  });

  it('shows an accessible placeholder for a profile photo to be added later', () => {
    const placeholder: HTMLDivElement = fixture.nativeElement.querySelector('.photo-visual');
    expect(placeholder.getAttribute('role')).toBe('img');
    expect(placeholder.getAttribute('aria-label')).toContain('profile photo');
    expect(placeholder.textContent).toContain('YOUR PHOTO HERE');
    expect(placeholder.textContent).toContain('Add your photo later');
  });

  it('toggles and persists the selected theme', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('.theme-toggle');
    button.click();
    fixture.detectChanges();
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('vk-theme')).toBe('light');
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('opens the mobile navigation and closes it after a section is selected', () => {
    const menu: HTMLButtonElement = fixture.nativeElement.querySelector('.menu-toggle');
    menu.click();
    fixture.detectChanges();
    expect(menu.getAttribute('aria-expanded')).toBe('true');
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('nav a[href="#projects"]');
    link.click();
    fixture.detectChanges();
    expect(menu.getAttribute('aria-expanded')).toBe('false');
    expect(link.getAttribute('aria-current')).toBe('location');
    expect(link.classList.contains('is-current')).toBe(true);
    expect(fixture.nativeElement.querySelector('#projects').classList.contains('is-active')).toBe(true);
  });

  it('highlights the systems section when its navigation link is selected', () => {
    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('nav a[href="#architecture"]');
    link.click();
    fixture.detectChanges();
    expect(link.getAttribute('aria-current')).toBe('location');
    expect(fixture.nativeElement.querySelector('#architecture').classList.contains('is-active')).toBe(true);
  });

  it('opens the included resume PDF for preview without forcing a download', () => {
    const resume: HTMLAnchorElement = fixture.nativeElement.querySelector('.nav-resume');
    expect(resume.getAttribute('href')).toBe('/assets/Vinay-Kumar-Kambala-Resume.pdf');
    expect(resume.hasAttribute('download')).toBe(false);
  });
});
