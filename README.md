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

