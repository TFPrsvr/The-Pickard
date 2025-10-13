# Expanded Vehicle Data Summary

## Overview

The vehicle database has been significantly expanded to include comprehensive year ranges and powersports data.

## Automotive Data Expansion

### Year Range Extended: 2010-2026

Previously the database only included 2015-2026 data. We have now expanded to include:

- **Years 2010-2014**: Added 2,064 new year/make/model combinations
- **Years 2015-2026**: Previously populated with 5,348 combinations

**Total Automotive Data**: 7,412 year/make/model combinations (2010-2026)

### Makes Included (15 Popular Makes)

1. FORD
2. CHEVROLET
3. TOYOTA
4. HONDA
5. NISSAN
6. RAM
7. GMC
8. JEEP
9. HYUNDAI
10. KIA
11. SUBARU
12. BMW
13. MERCEDES-BENZ
14. AUDI
15. LEXUS

## Powersports Data Addition

### Makes Included (16 Powersports Makes)

**Motorcycles:**
1. HARLEY-DAVIDSON
2. YAMAHA
3. KAWASAKI
4. SUZUKI
5. DUCATI
6. TRIUMPH
7. CAN-AM
8. KTM
9. HUSQVARNA
10. APRILIA
11. MOTO GUZZI
12. VICTORY
13. BUELL

**ATVs/UTVs/Powersports:**
14. POLARIS
15. ARCTIC CAT
16. HONDA (also includes motorcycles)

**Note**: INDIAN and SEA-DOO were not found in the NHTSA vPIC database and could not be added.

### Year Range: 2010-2026

Powersports data covers the full 17-year range from 2010 to 2026.

**Total Powersports Data**: 9,227 year/make/model combinations (2010-2026)
- **498 new models added**
- **0 errors during population**

## Data Source

All vehicle data is sourced from the official **NHTSA vPIC API** (National Highway Traffic Safety Administration Vehicle Product Information Catalog), ensuring accuracy and government validation.

## Database Schema

The expanded data populates the following tables:

1. **vehicle_makes**: Manufacturer information with category (automotive/powersports)
2. **vehicle_models**: Model information linked to makes
3. **vehicle_year_make_models**: Valid year/make/model combinations

## Scripts Used

### Automotive Data Population

- **Script**: `scripts/populate-vehicle-data.ts`
- **Configuration**:
  - Year range: 2010-2026 (expanded from 2015-2026)
  - 15 popular automotive makes
  - Rate limiting: 200ms between API requests

### Powersports Data Population

- **Script**: `scripts/populate-powersports-data.ts`
- **Configuration**:
  - Year range: 2010-2026
  - 16 powersports makes
  - Rate limiting: 200ms between API requests

## API Endpoints

The following API endpoints support the expanded data:

### Get Makes (with optional year filter)
```
GET /api/vehicles/makes
GET /api/vehicles/makes?year=2015
```

### Get Models (with required make and optional year filter)
```
GET /api/vehicles/models?make=FORD
GET /api/vehicles/models?make=FORD&year=2015
GET /api/vehicles/models?make=HARLEY-DAVIDSON&year=2020
```

## UI Components Updated

The following components now work with the expanded data:

1. **CategoryAwareVehicleSelector**: Fetches real data from API endpoints
   - Cascading dropdowns (Year → Make → Model)
   - Supports both automotive and powersports categories
   - Real-time API fetching with fallback to local data

## Data Quality

### Validation
- All makes verified against NHTSA vPIC API
- Only valid year/make/model combinations included
- Duplicate detection prevents data redundancy

### Statistics
- **0 errors** during automotive data population (2010-2014)
- **4 new models** added during automotive expansion
- Rate limiting ensures API compliance and prevents throttling

## Usage

### Running Population Scripts

```bash
# Populate automotive data for specific year range
npx tsx --env-file=.env.local scripts/populate-vehicle-data.ts --year-start=2010 --year-end=2014

# Populate powersports data
npx tsx --env-file=.env.local scripts/populate-powersports-data.ts

# Populate specific makes only
npx tsx --env-file=.env.local scripts/populate-powersports-data.ts --makes=YAMAHA,KAWASAKI

# Skip make/model population and go straight to year/make/model combos
npx tsx --env-file=.env.local scripts/populate-vehicle-data.ts --skip-makes --skip-models
```

### Command Line Options

**populate-vehicle-data.ts:**
- `--year-start=YYYY`: Start year (default: 2010)
- `--year-end=YYYY`: End year (default: current year + 1)
- `--makes=MAKE1,MAKE2`: Specific makes to process
- `--skip-makes`: Skip Step 1 (adding makes)
- `--skip-models`: Skip Step 2 (adding models)
- `--with-engines`: Include engine data (default: false)

**populate-powersports-data.ts:**
- `--year-start=YYYY`: Start year (default: 2010)
- `--year-end=YYYY`: End year (default: current year + 1)
- `--makes=MAKE1,MAKE2`: Specific makes to process

## Future Enhancements

Potential areas for expansion:

1. **Engine Data**: Populate engine specifications (displacement, cylinders, fuel type, horsepower)
2. **Drive Types**: Add drive type options for each year/make/model/engine combination
3. **Trim Levels**: Include trim level data for specific models
4. **Additional Makes**: Expand beyond the 15+16 popular makes
5. **Commercial Vehicles**: Add semi-trucks, buses, and heavy-duty equipment
6. **RVs and Trailers**: Expand recreational vehicle coverage

## Maintenance

### Re-running Scripts

The population scripts are idempotent and can be safely re-run:
- Duplicate detection prevents adding existing data
- New data will be added if available
- Existing data remains unchanged

### Updating for New Years

To add new model years as they become available:

```bash
npx tsx --env-file=.env.local scripts/populate-vehicle-data.ts --year-start=2027 --year-end=2027 --skip-makes --skip-models
npx tsx --env-file=.env.local scripts/populate-powersports-data.ts --year-start=2027 --year-end=2027
```

## Performance

### Population Times

- **Automotive (2010-2014)**: ~3-5 minutes for 2,064 combinations
- **Powersports (2010-2026)**: ~10-15 minutes for 16 makes × 17 years

### Rate Limiting

- 200ms delay between API requests
- Prevents NHTSA API throttling
- Ensures reliable data fetching

## Documentation

- **Setup Guide**: `docs/VEHICLE_DATA_SETUP.md`
- **API Documentation**: `docs/developers/API.md`
- **Project Memory**: `CLAUDE.md`
