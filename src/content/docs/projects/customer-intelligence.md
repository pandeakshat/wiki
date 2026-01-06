---
title: Customer Intelligence Hub
description: Customer Intelligence Hub
---

## 1. Overview
The **Customer Intelligence Hub** is a modular Streamlit application designed to ingest raw customer data (CSV/Excel) and apply four distinct analytical lenses: **Churn Prediction, Customer Segmentation, Sentiment Analysis, and Geospatial Mapping**. It features a "Self-Healing" state management system and an "Auto-Detection" engine that identifies data types based on column headers.

### Tech Stack
* **Frontend:** Streamlit, Plotly, Matplotlib.
* **ML Core:** XGBoost (Churn/CLV), Scikit-Learn (Segmentation/LDA), VADER (Sentiment).
* **Data Processing:** Pandas, NumPy.
* **Geospatial:** Geopy, Plotly Mapbox.
* **Explainability:** SHAP (Shapley Additive Explanations).

---

## 2. System Architecture

The project follows a standard **Frontend-Backend separation** pattern within a Python environment. The `src/` folder acts as the backend API.

### Directory Structure
~~~text
Root/
├── app.py                     # Entry Point & Capability Detection
├── requirements.txt           # Requirements File for Deployment
└── pages/                     # Pages Utility for Streamlit
    ├── 1_Churn.py                 # UI: Risk Dashboard & Simulator
    ├── 2_Segmentation.py          # UI: Clustering & Logic Trees
    ├── 3_Sentiment.py             # UI: NLP & Topic Modeling
    ├── 4_Geospatial.py            # UI: Maps & Route Analytics
    ├── 5_Customer_View.py         # UI: Single Customer Inspector
├── data/                      # Raw CSV/Excel inputs
└── src/                       # "The Brain" (Business Logic & ML)
    ├── churn_engine.py        # XGBoost Classifier Pipeline
    ├── clv_engine.py          # XGBoost Regressor for LTV
    ├── segment_engine.py      # KMeans + Decision Tree Rules
    ├── sentiment_engine.py    # VADER + LDA Topic Extraction
    ├── geo_engine.py          # Hybrid Geocoding (Dict + API)
    ├── nlg_engine.py          # Natural Language Generation
    ├── recommendation_engine.py # Rule-based Strategy Mapper
    ├── data_loader.py         # Universal File Reader
    ├── config.py              # Paths & Constants
    └── validator.py           # Column Regex Validation
~~~

---

## 3. Core Workflow Diagrams

### A. Data Ingestion & Auto-Detection
The system automatically determines which modules to enable based on fuzzy string matching of column headers (e.g., if it sees "ReviewBody", it enables Sentiment).

~~~mermaid
graph TD
    A[User Uploads CSV] --> B[data_loader.py]
    B --> C{app.py: Auto-Register}
    C -->|Has 'churn', 'exited'| D[Enable Churn Module]
    C -->|Has 'lat', 'city'| E[Enable Geo Module]
    C -->|Has 'review', 'text'| F[Enable Sentiment Module]
    C -->|Has 'spend', 'amount'| G[Enable Segmentation Module]
    D & E & F & G --> H[Session State 'Flags']
    H --> I[Update UI Badges]
~~~

### B. Churn Prediction Pipeline
The Churn engine uses a production-ready pipeline that handles encoding, training, and explanation.

~~~mermaid
graph LR
    RawData --> Clean[_clean_data]
    Clean --> Split[Train/Test Split]
    Split --> Encode[Label Encoding]
    Encode --> XGB[XGBoost Classifier]
    XGB --> SHAP[SHAP Explainer]
    XGB --> Preds[Probabilities]
    Preds --> Risk[Risk Groups: Low/Med/High]
~~~

---

## 4. Analytical Modules (Deep Dive)

### Churn Engine 
(`src/churn_engine.py`)

Predicts the likelihood of a customer leaving using XGBoost.
* **Algorithm:** `XGBClassifier` with `scale_pos_weight` to handle class imbalance.
* **Key Features:**
    * **Simulate Churn:** Allows users to modify a single row (e.g., lower monthly bill) and re-predict risk in real-time.
    * **Directional Importance:** Calculates feature importance and correlates it with risk to determine if a feature "Increases" or "Decreases" risk.
    * **Retention Plan:** Aggregates churn rates by category to suggest the "Safest Segment" (e.g., "2-Year Contract has lowest churn").

### Segmentation Engine 
(`src/segment_engine.py`)

Groups customers using Unsupervised Learning, then explains the groups using Supervised Learning.
* **Algorithm:** **K-Means Clustering** (grouping) followed by a **Decision Tree Classifier** (rule extraction).
* **Mode Detection:** Automatically detects if data is "Demographic" (Age/Spend) or "RFM" (Recency/Freq/Monetary) to adjust preprocessing.
* **Smart Labeling:** Dynamically names clusters (e.g., "Young Saver", "Lost Whale") based on centroid statistics.

### Sentiment Engine 
(`src/sentiment_engine.py`)

Analyzes unstructured text data.
* **Sentiment Scoring:** Uses **VADER** (Valence Aware Dictionary and sEntiment Reasoner) to generate compound scores (-1 to +1).
* **Topic Modeling:** Uses **LDA** (Latent Dirichlet Allocation) via `sklearn` to extract top keywords and themes from the text corpus.
* **Data Cleaning:** Removes punctuation and normalizes text before vectorization.

### Geospatial Engine 
(`src/geo_engine.py`)

Maps location strings to coordinates.
* **Hybrid Approach:**
    1.  **Tier 1:** Checks a massive internal dictionary of IATA codes (LHR, JFK) and major cities.
    2.  **Tier 2:** Performs fuzzy string matching (substrings/typos).
    3.  **Tier 3:** (Optional) Calls the Nominatim API for deep scanning.
* **Route Parser:** Capable of extracting origin/destination from strings like "London to Paris".

---

## 5. Business Logic Layer

The `src/recommendation_engine.py` file acts as the bridge between raw math and business advice. It applies conditional logic to generate "Next Best Actions".

| Context | Persona Logic Example | Action Example |
| :--- | :--- | :--- |
| **Demographic** | `Age < 30` + `Spend > Avg` → **"Gen Z Spender"** | "Strategy: Trend & FOMO. Push 'Trending Now' items." |
| **RFM** | `Recency < 30` + `Monetary > High` → **"Champion"** | "Strategy: Reward. Action: VIP Tier Upgrade." |
| **Churn** | `Risk > 80%` → **"Flight Risk"** | "Action: Call with 20% Retention Discount." |
| **Geo** | `Traffic > High` + `Rating < Low` → **"High Vol/Low Sat"** | "Action: Audit Ground Staff & Delays." |

---

## 6. Key UI Features

### The Single Customer View 
(`5_Customer_View.py`)

This page aggregates data for one specific ID.
* **Radar Chart:** Plots a customer's percentile rank against the population average for top metrics.
* **Risk Gauge:** Visualizes churn probability using a Plotly gauge chart.
* **Cross-Module Access:** Can pull data from Churn, Segmentation, or Sentiment caches depending on what is loaded.

### The Simulator 
(`1_Churn.py`)

* Users can manipulate sliders (for numeric data) and dropdowns (for categorical data) to create a hypothetical customer profile.
* The system runs `churn_bot.predict_single()` to return the new probability and generates a SHAP waterfall plot to explain the specific prediction.

---

## 7. Installation & Usage

1.  **Environment Setup:**
    Ensure requirements are installed (pandas, streamlit, xgboost, shap, plotly, geopy, scikit-learn).
2.  **Run Application:**
    ~~~bash
    streamlit run app.py
    ~~~
3.  **Loading Data:**
    * **Option A:** Click "Load Demo Data" on the home page.
    * **Option B:** Upload a CSV. The `auto_register_data` function in `app.py` will scan columns and activate the relevant tabs in the sidebar.

## 8. Common Troubleshooting

* **"No Geospatial Data Active":** The CSV must contain columns like 'City', 'Country', 'Location', or 'Route' for the auto-detector to flag it.
* **"Unmatched Locations":** If the offline dictionary misses a city, enable "Deep Scan" in `4_Geospatial.py` to hit the live API.
* **Churn Model Errors:** If columns are missing (specifically 'Churn'), the model will refuse to train. Use `validator.py` logic to check requirements.