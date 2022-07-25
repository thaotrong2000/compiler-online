import { LanguageExample } from './../../constant/languageExample';
import { language } from './../../constant/language';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss'],
})
export class CompilerComponent implements OnInit {
  editorOptions = {
    theme: 'vs-dark',
    language: 'cpp',
  };
  code!: string;
  language!: Language[];
  languageSupport: LanguageSupport[] = language;
  listTheme = [
    { value: 'vs-dark', label: 'Visual Studio Dark' },
    { value: 'vs', label: 'Visual Studio' },
    { value: 'hc-black', label: 'High Contrast Dark' },
  ];

  formData = {
    language_id: 63,
    // encode source code in base64
    source_code:
      'I2luY2x1ZGUgPHN0ZGlvLmg+DQoNCmludCBtYWluKHZvaWQpIHsNCiAgY2hhciBuYW1lWzEwXTsNCiAgc2NhbmYoIiVzIiwgbmFtZSk7DQogIHByaW50ZigiaGVsbG8sICVzXG4iLCBuYW1lKTsNCiAgcmV0dXJuIDA7DQp9',
    stdin: 'SGVsbG9Xb3Jk',
  };

  textOutput: string = '';
  textInput: string = '';

  inforCompiler!: {
    status: number | undefined;
    memory: number | undefined;
    time: number | undefined;
  };

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    // Get all language:
    this.commonService.getAllLanguage().subscribe((language) => {
      console.log(language);
      // this.language = language;
    });

    this.code = atob(this.formData.source_code);

    console.log(this.editorOptions);

    this.language = LanguageExample;

    this.language.forEach((value) => {
      if (value.id === this.formData.language_id) {
        this.code = this.b64_to_utf8(value.example);
      }
    });
  }

  onInit(editor: any) {
    let line = editor.getPosition();
    console.log(line);
  }

  compareAndExecute() {
    console.log(this.formData);
    this.formData.source_code = btoa(this.code);
    this.formData.stdin = this.utf8_to_b64(this.textInput);

    this.commonService.postSourceCode(this.formData).subscribe((data) => {
      this.commonService.getOutput(data).subscribe((data: any) => {
        console.log(atob(data.stdout));

        this.inforCompiler = {
          status: data.status_id,
          memory: data.memory,
          time: data.time,
        };

        switch (data.status_id) {
          case 3:
            this.textOutput = decodeURIComponent(
              escape(window.atob(data.stdout))
            );
            break;
          case 6:
            this.textOutput = decodeURIComponent(
              escape(window.atob(data.compile_output))
            );
            break;
          case 5:
            this.textOutput = 'Time Limit Exceeded';
            break;
          default:
            this.textOutput = decodeURIComponent(
              escape(window.atob(data.compile_output))
            );
            break;
        }
      });
    });
  }

  onChangeLanguage(language: number) {
    const languageSelected = this.language.find((value) => {
      if (value.id === language) {
        return value;
      }

      return;
    });

    // const languageSelected = this.languageSupport.find((value) => {
    //   if (value.id === language) {
    //     return value;
    //   }
    //   return;
    // });

    if (languageSelected) {
      this.editorOptions = {
        ...this.editorOptions,
        language: languageSelected.value,
      };

      this.code = this.b64_to_utf8(languageSelected?.example);
      this.textOutput = '';
      this.inforCompiler = {
        status: undefined,
        memory: undefined,
        time: undefined,
      };

      console.log(this.editorOptions);
    }
  }

  onChangeTheme(theme: string) {
    this.editorOptions = {
      ...this.editorOptions,
      theme: theme,
    };
  }

  utf8_to_b64(str: string) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }

  b64_to_utf8(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
  }
}

export interface Language {
  id: number;
  is_archived: boolean;
  name: string;
  example: string;
  value: string;
}

export interface LanguageSupport {
  id: number;
  name: string;
  label: string;
  value: string;
}
