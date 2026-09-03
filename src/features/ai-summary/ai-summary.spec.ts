import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AiSummary } from './ai-summary';

describe('AiSummary', () => {
  let component: AiSummary;
  let fixture: ComponentFixture<AiSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(AiSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('answers a question asked and renders the result', async () => {
    const promptSpy = vi.fn().mockResolvedValue('The pope is Leo XIV.');
    const createSpy = vi.fn().mockResolvedValue({ prompt: promptSpy });
    const availabilitySpy = vi.fn().mockResolvedValue('available');

    (globalThis as any).LanguageModel = {
      availability: availabilitySpy,
      create: createSpy,
    };

    component.prompt = 'Who is the pope?';
    fixture.detectChanges();

    const form: HTMLFormElement = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(promptSpy).toHaveBeenCalledWith([
      { role: 'user', content: 'Who is the pope?' },
    ]);
    expect(fixture.nativeElement.querySelector('p').textContent).toContain(
      'The pope is Leo XIV.',
    );
  });
});
