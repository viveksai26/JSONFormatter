import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { scheduled } from 'rxjs';
import { startWith } from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  formattedJsonForTable: any = [];
  sampleJSON = `{
    "success": true,
    "Status": 200,
    "content": {
      "associateFirms": [
        {
          "firmName": "myFirm1",
          "firmAddress": {
            "address": "test1",
            "line": 'test2',
            "city": "Hyderabad",
            "country": "India"
          },
          "firmAddress2": {
            "address": "test1",
            "line": 'test2',
            "city": "Hyderabad",
            "country": "India"
          }
        },
              {
          "firmName": "myFirm2",
          "firmAddress": {
            "address": "test1",
            "line": 'test2',
            "city": "Hyderabad",
            "country": "India"
          },
          "firmAddress2": {
            "address": "test1",
            "line": 'test2',
            "city": "Hyderabad",
            "country": "India"
          }
        }
      ],
      "message": "Test1"
    }
  }`
  formattedJsonForTable2: any;
  formattedJson2: any;
  myError2: any;
  combinedDataTable: any;
  constructor(private formBuilder: FormBuilder) {}
  title = 'JSONTester';
  formattedJson:any;
  myError: any;
  jsonFormGroup: FormGroup = {} as FormGroup;
  displayedColumns: any = ['name', 'value', 'value2', 'name2'];
  ngOnInit(): void {
    this.formGenerator();
    this.jsonFormGroup.valueChanges.subscribe((data) => {
      try {
        const fJSON = this.recursionTest({}, '',JSON.parse(data.json?.replace(/'/g, '"' )));
        this.formattedJsonForTable = [];
        for (let x in fJSON) {
          this.formattedJsonForTable.push({name:x, value: fJSON[x]})
        }
        this.formattedJsonForTable.sort((a:any, b: any) => {return a.name.localeCompare(b.name)})
        this.formattedJson = fJSON;
        this.myError = null;
      } catch (error) {
        this.myError = error;
        this.formattedJson = null;
        this.formattedJsonForTable = [];
      }
      try {
        const fJSON = this.recursionTest({}, '',JSON.parse(data.json2?.replace(/'/g, '"' )));
        this.formattedJsonForTable2 = [];
        for (let x in fJSON) {
          this.formattedJsonForTable2.push({name:x, value: fJSON[x]})
        }
        this.formattedJsonForTable2.sort((a:any, b: any) => {return a.name.localeCompare(b.name)})
        this.formattedJson2 = fJSON;
        this.myError2 = null;
      } catch (error) {
        this.myError2 = error;
        this.formattedJson2 = null;
        this.formattedJsonForTable2 = [];
      }
      this.combinedDataTable = [];
      let maxLength =  this.formattedJsonForTable2.length > this.formattedJsonForTable.length ? this.formattedJsonForTable2.length : this.formattedJsonForTable.length;
      for (let i=0; i<maxLength; i+=1) {
        this.combinedDataTable.push(
          {
          name: this.formattedJsonForTable[i]?.name,
          value: this.formattedJsonForTable[i]?.value,
          name2: this.formattedJsonForTable2[i]?.name,
          value2: this.formattedJsonForTable2[i]?.value,
          highlightRowValue: this.formattedJsonForTable[i]?.value !== this.formattedJsonForTable2[i]?.value,
          highlightRowName: this.formattedJsonForTable[i]?.name !== this.formattedJsonForTable2[i]?.name
        })
      }
    });
    this.jsonFormGroup.patchValue({});
  }

  recursionTest(initialObject: any, iterativeName: any, json: any) {
    if (Array.isArray(json)) {
      json.forEach((val) => {
        this.recursionTest(initialObject, iterativeName, val);
      });
    } else if (this.checkIfObject(json)) {
      for (let i in json) {
        this.recursionTest(
          initialObject,
          iterativeName ? iterativeName + '.' + i : i,
          json[i]
        );
      }
    } else {
      if (!iterativeName) {
        initialObject[iterativeName] = json;
      } else {
        initialObject[iterativeName] = json;
      }
    }
    return initialObject;
  }

  checkIfObject(myObject: any) {
    if (
      typeof myObject === 'object' &&
      !Array.isArray(myObject) &&
      myObject !== null
    ) {
      return true;
    }
    return false;
  }

  formGenerator() {
    this.jsonFormGroup = this.formBuilder.group({
      json: [this.sampleJSON, Validators.required],
      json2: [this.sampleJSON, Validators.required],
    });
  }
}
