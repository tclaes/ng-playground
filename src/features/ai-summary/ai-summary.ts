import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-ai-summary',
  styleUrl: './ai-summary.css',
  template: `
    <form (ngSubmit)="summarize()">
      <textarea name="question" [(ngModel)]="prompt" rows="5"></textarea>
      <button>Summarize</button>
    </form>
    <div>
      <p>{{ summary() }}</p>
    </div>
  `,
})
export class AiSummary {
  prompt = '';

  private _summary = signal<string>('');
  readonly summary = this._summary.asReadonly();

  // Chrome's Prompt API requires the input and output languages to be declared.

  protected async summarize() {
    if (!this.prompt.trim()) {
      return;
    }

    const availability = await LanguageModel.availability(this.languageOptions());

    if (availability === 'unavailable') {
      this._summary.set('Language model is not available on this device.');
      return;
    }

    this._summary.set('Thinking about it...');

    const session = await LanguageModel.create({
      ...this.languageOptions(),
      initialPrompts: [{ role: 'system', content: 'Answer the question asked in English' }],
    });

    const result = await session.prompt([
      {
        role: 'user',
        content: this.prompt,
      },
    ]);

    this._summary.set(result);
  }

  // Omitting them throws "no language specified" / NotSupportedError.
  private languageOptions(): LanguageModelCreateCoreOptions {
    return {
      expectedInputs: [{ type: 'text', languages: ['en'] }],
      expectedOutputs: [{ type: 'text', languages: ['en'] }],
    };
  }
}
