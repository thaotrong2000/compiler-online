import { language } from './../../constant/language';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss'],
})
export class CompilerComponent implements OnInit {
  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';
  language: Language[] = language;
  formData = {
    language_id: 52,
    // encode source code in base64
    source_code:
      'I2luY2x1ZGUgPHN0ZGlvLmg+CgppbnQgbWFpbih2b2lkKSB7CiAgY2hhciBuYW1lWzEwXTsKICBzY2FuZigiJXMiLCBuYW1lKTsKICBwcmludGYoImhlbGxvLCAlc1xuIiwgbmFtZSk7CiAgcmV0dXJuIDA7Cn0=',
    stdin: 'SnVkZ2Uw',
  };

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {}

  onInit(editor: any) {
    let line = editor.getPosition();
    console.log(line);
  }

  compareAndExecute() {
    this.commonService.postSourceCode(this.formData).subscribe((data) => {
      this.commonService.getOutput(data).subscribe((data: any) => {
        console.log(atob(data.stdout));
      });
    });
  }

  onChangeLanguage(lang: string) {
    console.log(lang);
    const selectedLang = this.language.find((value) => {
      if (value.value === lang) {
        return value;
      }
      return;
    });

    if (selectedLang) {
      this.formData.language_id = 52;
      this.formData.source_code = btoa(this.code);
    }

    console.log(this.formData);
  }
}

export interface Language {
  id: number;
  name: string;
  label: string;
  value: string;
}
