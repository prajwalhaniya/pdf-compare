# PDF-Compare

A simple software tool to compare two pdfs.

![image](/assets/pdf-compare.png)

### Installation

- Download the repository
- npm i
- start the app using `nodemon` or `node index.js`

### Usage

At present, two sample files from the pdfs folder are used. Once you clone the repo you can add your different files & change the import of files accordingly.

When you call the API `localhost:3005/compare-pdfs` if the pdfs are processed successfully, you can see the below objects in the console.

**Content Difference**

```
  contentDifferenceMap: Map(1) {
    2 => {
      P1L2: 'I would like to welcome you to test this software.',
      P2L2: 'Pdf-compare is a simple tool to compare two pdfs.'
    }
  }
```
The above object is a map in the `console`, the output you see in the UI will be an array.

**Page Difference**

```
page difference: { pdf1_total_pages: 1, pdf2_total_pages: 1 },
```

**Meta info difference**

```
{
  metaDifference: {
    // can consists of other data. Depends on the pdf file
    pdf1_meta_info: {
      PDFFormatVersion: '1.4',
      Language: null,
      EncryptFilterName: null,
      IsLinearized: false,
      IsAcroFormPresent: false,
      IsXFAPresent: false,
      IsCollectionPresent: false,
      IsSignaturesPresent: false,
      Creator: 'Mozilla/5.0...',
      Producer: 'Skia/PDF m120',
      CreationDate: "D:20240105161129+00'00'",
      ModDate: "D:20240105161129+00'00'"
    },
    pdf2_meta_info: {
      PDFFormatVersion: '1.4',
      Language: null,
      EncryptFilterName: null,
      IsLinearized: false,
      IsAcroFormPresent: false,
      IsXFAPresent: false,
      IsCollectionPresent: false,
      IsSignaturesPresent: false,
      Creator: 'Mozilla/5.0...',
      Producer: 'Skia/PDF m120',
      CreationDate: "D:20240105161215+00'00'",
      ModDate: "D:20240105161215+00'00'"
    }
  },
```

