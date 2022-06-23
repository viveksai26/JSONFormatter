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
  constructor(private formBuilder: FormBuilder) {}
  title = 'JSONTester';
  formattedJson:any;
  myError: any;
  jsonFormGroup: FormGroup = {} as FormGroup;
  displayedColumns: any = ['name', 'value'];
  ngOnInit(): void {
    this.formGenerator();
    this.jsonFormGroup.valueChanges.subscribe((data) => {
      try {
        const fJSON = this.recursionTest({}, '',JSON.parse(data.json?.replace(/'/g, '"' )));
        this.formattedJsonForTable = [];
        for (let x in fJSON) {
          this.formattedJsonForTable.push({name:x, value: fJSON[x]})
        }
        console.log(this.formattedJsonForTable);
        this.formattedJson = fJSON;
        this.myError = null;
      } catch (error) {
        this.myError = error;
        this.formattedJson = null;
        this.formattedJsonForTable = [];
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
    });
  }
}
