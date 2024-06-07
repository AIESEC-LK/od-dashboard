# OD Dashboard - Data Pipeline

###### Basically This project is designed to extract data from the OD Mastersheet and product data using the `aiesec-data` repository, load it into Firestore (Firebase), and then push the data to a BigQuery project. This allows for seamless data integration and analysis using BigQuery.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Data Extraction](#data-extraction)
- [Loading Data into Firestore](#loading-data-into-firestore)
- [Pushing Data to BigQuery](#pushing-data-to-bigquery)
- [Running the Pipeline](#running-the-pipeline)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.7 or higher installed
- Google Cloud SDK installed and configured
- Firebase CLI installed
- Access to the `aiesec-data` repository
- Access to Firebase and BigQuery projects

## Project Structure


Sure, here is the complete README file content you can save as README.md:

markdown
Copy code
# OD Dashboard - Data Pipeline

This project is designed to extract data from the OD Mastersheet and product data using the `aiesec-data` repository, load it into Firestore (Firebase), and then push the data to a BigQuery project. This allows for seamless data integration and analysis using BigQuery.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Data Extraction](#data-extraction)
- [Loading Data into Firestore](#loading-data-into-firestore)
- [Pushing Data to BigQuery](#pushing-data-to-bigquery)
- [Running the Pipeline](#running-the-pipeline)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.7 or higher installed
- Google Cloud SDK installed and configured
- Firebase CLI installed
- Access to the `aiesec-data` repository
- Access to Firebase and BigQuery projects

## Project Structure

OD-Dashboard-Data-Pipeline/
├── data_extraction/
│ ├── extract_data.py
│ └── ...
├── firestore_loading/
│ ├── load_firestore.py
│ └── ...
├── bigquery_loading/
│ ├── load_bigquery.py
│ └── ...
├── config/
│ ├── firestore_config.json
│ ├── bigquery_config.json
│ └── ...
├── main.py
├── requirements.txt
└── README.md


- `data_extraction/`: Contains scripts for extracting data from the OD Mastersheet and product data.
- `firestore_loading/`: Contains scripts for loading extracted data into Firestore.
- `bigquery_loading/`: Contains scripts for pushing data from Firestore to BigQuery.
- `config/`: Configuration files for Firestore and BigQuery.
- `main.py`: Main script to run the entire data pipeline.
- `requirements.txt`: Lists Python dependencies.

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/OD-Dashboard-Data-Pipeline.git
   cd OD-Dashboard-Data-Pipeline

2. **Install dependencies**
   ```python
   pip install -r requirements.txt
4. Configure Firebase and BigQuery
   > Place your Firebase configuration in config/firestore_config.json.
   > Place your BigQuery configuration in config/bigquery_config.json.

## Data Extraction

Data extraction scripts are located in the data_extraction/ directory. These scripts are responsible for extracting data from the OD Mastersheet and product data using the aiesec-data repository.

Example usage:
```python
   from data_extraction.extract_data import extract_od_mastersheet, extract_product_data
   
   od_data = extract_od_mastersheet()
   product_data = extract_product_data()
```

## Loading Data into Firestore
Scripts for loading data into Firestore are located in the firestore_loading/ directory.

Example usage:
```python
   from firestore_loading.load_firestore import load_data_to_firestore
   
   load_data_to_firestore(od_data, 'od_mastersheet_collection')
   load_data_to_firestore(product_data, 'product_data_collection')
```

## Pushing Data to BigQuery
Scripts for pushing data to BigQuery are located in the bigquery_loading/ directory.

Example usage:
```python
   from bigquery_loading.load_bigquery import push_data_to_bigquery
   
   push_data_to_bigquery('od_mastersheet_collection', 'bigquery_table_od')
   push_data_to_bigquery('product_data_collection', 'bigquery_table_product')
```

## Running the Pipeline
The entire pipeline can be run using the main.py script. This script coordinates the extraction, loading to Firestore, and pushing to BigQuery.4
```python
   python main.py
```

## Contribution & Conclusion
We are still reviewing the documentation. Feel free to contribute to the project
