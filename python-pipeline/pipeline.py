import datetime
raw_lab_dump = [
    { "patientId": "PT-0921", "testDate": "2026-07-10", "marker": "HEMOGLOBIN", "resultValue": "11.2", "unit": "g/dL" },
    { "patientId": "PT-1442", "testDate": "11/07/2026", "marker": "platelets", "resultValue": "250", "unit": "x10^9/L" },
    { "patientId": "PT-0921", "testDate": "2026-07-10", "marker": "WHITE_BLOOD_CELLS", "resultValue": "14.8", "unit": "thousand/uL" },
    { "patientId": "PT-3301", "testDate": "2026-07-12", "marker": "Hemoglobin", "resultValue": None, "unit": "g/dL" }, # Python uses 'None' for missing/null data
    { "patientId": "PT-5521", "testDate": "2026-07-13", "marker": "PLATELETS", "resultValue": "85", "unit": "x10^9/L" }
]

total_records = len(raw_lab_dump)
print(f"🚀 Extraction Layer: Successfully ingested {total_records} raw records via Python.")
