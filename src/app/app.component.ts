import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  data:any = [];

	onFileChange(evt: any) {
		/* wire up file reader */
		const target: DataTransfer = <DataTransfer>(evt.target);
		if (target.files.length !== 1) throw new Error('Cannot use multiple files');
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
			/* read workbook */
			const bstr: string = e.target.result;
			const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      for(let i=0; i<wb.SheetNames.length;i++){
        const wsname: string = wb.SheetNames[i];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        console.log(XLSX.utils.sheet_to_json(ws));
        /* save data */
        this.data.push(JSON.stringify(XLSX.utils.sheet_to_json(ws)));
      }
			
		};
		reader.readAsBinaryString(target.files[0]);
	}
}
