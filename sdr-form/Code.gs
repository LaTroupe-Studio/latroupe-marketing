/**
 * latroupe() — SDR application backend
 * Receives the form POST, saves the CV to a Drive folder, and appends a row
 * to a Google Sheet. Everything stays inside your own Google Workspace.
 *
 * SETUP
 *  1. Create a Google Sheet. Copy its ID from the URL
 *     (https://docs.google.com/spreadsheets/d/THIS_PART/edit) into SHEET_ID.
 *  2. Create a Drive folder for the CVs. Copy its ID from the URL
 *     (https://drive.google.com/drive/folders/THIS_PART) into CV_FOLDER_ID.
 *  3. Extensions ▸ Apps Script, paste this file, save.
 *  4. Deploy ▸ New deployment ▸ type "Web app".
 *       - Execute as: Me
 *       - Who has access: Anyone
 *     Copy the Web app URL and paste it into SCRIPT_URL in index.html.
 *  5. Run setupHeaders() once from the editor to write the header row
 *     (authorize the script when prompted).
 */

const SHEET_ID     = "YOUR_GOOGLE_SHEET_ID";
const CV_FOLDER_ID = "YOUR_DRIVE_FOLDER_ID";

// Column order — matches the form field names (the "name" attributes).
const COLUMNS = [
  "Timestamp",
  "Full name",
  "Email",
  "Phone",
  "Country",
  "LinkedIn",
  "CV link",
  "Portfolio",
  "Architecture experience",
  "Architecture experience detail",
  "UK market",
  "UK market detail",
  "US market",
  "US market detail",
  "Biggest market challenge",
  "English level",
  "Outbound years",
  "Tools",
  "Tools other",
  "Cold calling",
  "Spanish level",
  "Organization system",
  "High volume example",
  "Weekly hours",
  "Time zone",
  "Availability",
  "Expected rate EUR",
  "Can invoice today",
  "Scenario answer",
  "Consent"
];

function setupHeaders() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
  sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. Save the CV to Drive and build a shareable link.
    let cvLink = "";
    if (data._fileBase64 && data._fileName) {
      const folder = DriveApp.getFolderById(CV_FOLDER_ID);
      const decoded = Utilities.base64Decode(data._fileBase64);
      const safeName = (data["Full name"] || "applicant").replace(/[^\w\s-]/g, "").trim();
      const blob = Utilities.newBlob(decoded, data._fileType, safeName + " — " + data._fileName);
      const file = folder.createFile(blob);
      cvLink = file.getUrl();
    }
    data["CV link"] = cvLink;

    // 2. Stamp the time (Madrid).
    data["Timestamp"] = Utilities.formatDate(new Date(), "Europe/Madrid", "yyyy-MM-dd HH:mm:ss");

    // 3. Append a row in the fixed column order.
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const row = COLUMNS.map(col => data[col] != null ? data[col] : "");
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
