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

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    const formData = {
      language_id: 1,
      // encode source code in base64
      source_code: '',
      stdin: '',
    };

    this.commonService.postSourceCode().subscribe((data) => {
      this.commonService.getOutput(data).subscribe((data: any) => {
        console.log(atob(data.stdout));
      });
    });
  }

  onInit(editor: any) {
    let line = editor.getPosition();
    console.log(line);
  }
}

export interface Language {
  id: number;
  name: string;
  label: string;
  value: string;
}
