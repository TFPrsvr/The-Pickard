# Vehicle Data Setup Guide

This guide explains how to populate your database with real, accurate vehicle data from the NHTSA vPIC API (National Highway Traffic Safety Administration Vehicle Product Information Catalog).

## 🎯 What Was Created

### 1. **Database Schema** (`src/lib/schema.ts`)

Added 6 new tables for vehicle specifications:

- `vehicle_makes` - All vehicle manufacturers (Ford, Toyota, etc.)
- `vehicle_models` - All models for each make (F-150, Camry, etc.)
- `vehicle_year_make_models` - Valid year/make/model combinations
- `vehicle_engines` - Engine specifications for each combination
- `vehicle_drive_types` - Drive type options (FWD, RWD, AWD, 4WD)
- `vehicle_trims` - Trim levels/submodels (Limited, Sport, XLT, etc.)

### 2. **NHTSA vPIC API Integration** (`src/lib/nhtsa-vpic-api.ts`)

Complete API client for fetching real vehicle data from the US government database:

- `getAllMakes()` - Get all vehicle makes
- `getModelsForMake(make)` - Get models for a specific make
- `getModelsForMakeYear(make, year)` - Get models for make + year
- `getMakesForYear(year)` - Get makes available in a year
- `decodeVIN(vin)` - Get detailed specs from VIN
- `batchFetchVehicleData()` - Bulk data fetching

### 3. **Data Population Script** (`scripts/populate-vehicle-data.ts`)

Automated script to populate your database with real vehicle data.

### 4. **API Endpoints** for Cascading Dropdowns

- `/api/vehicles/makes?year=2024` - Get makes (optionally filtered by year)
- `/api/vehicles/models?make=Ford&year=2024` - Get models for make + year

## 🚀 Setup Instructions

### Step 1: Run Database Migration

First, generate and push the new schema to your database:

```bash
npm run db:generate
npm run db:push
```

This creates the 6 new vehicle specification tables in your PostgreSQL database.

### Step 2: Populate Vehicle Data

Run the population script to fetch real data from NHTSA:

**Option A: Populate recent years (2015-2025) with popular makes** (Recommended for testing)
```bash
npm run tsx scripts/populate-vehicle-data.ts
```

**Option B: Custom year range**
```bash
npm run tsx scripts/populate-vehicle-data.ts -- --year-start=2020 --year-end=2025
```

**Option C: Specific makes only**
```bash
npm run tsx scripts/populate-vehicle-data.ts -- --makes=Ford,Toyota,Honda
```

**Option D: Full population (all makes, longer runtime)**
```bash
npm run tsx scripts/populate-vehicle-data.ts -- --year-start=2010 --year-end=2025 --skip-makes
```

### Estimated Runtime:
- **Quick test** (2020-2025, 3 makes): ~2-5 minutes
- **Recommended** (2015-2025, popular makes): ~10-15 minutes
- **Full** (all makes, 10+ years): ~30-60 minutes

The script includes:
- ✅ Progress indicators
- ✅ Rate limiting (NHTSA-compliant)
- ✅ Duplicate detection
- ✅ Error handling
- ✅ Statistics summary

### Step 3: Verify Data

Check that data was populated correctly:

```sql
-- Check how many makes were added
SELECT COUNT(*) FROM vehicle_makes;

-- Check year/make/model combinations
SELECT COUNT(*) FROM vehicle_year_make_models;

-- See sample data
SELECT
  ymm.year,
  m.make_name,
  mo.model_name
FROM vehicle_year_make_models ymm
JOIN vehicle_makes m ON ymm.make_id = m.id
JOIN vehicle_models mo ON ymm.model_id = mo.id
WHERE ymm.year = 2024
LIMIT 20;
```

## 📊 How Cascading Dropdowns Work

### Current Flow:

1. **User selects Year** → API calls `/api/vehicles/makes?year=2024`
2. **Dropdown shows only makes with models in 2024** (e.g., Ford, Toyota, not brands that ended production)
3. **User selects Make** → API calls `/api/vehicles/models?make=Ford&year=2024`
4. **Dropdown shows only Ford models available in 2024** (e.g., F-150, Mustang)
5. **User selects Model** → API would call `/api/vehicles/engines?year=2024&make=Ford&model=F-150`
6. **Dropdown shows only engines available for 2024 Ford F-150**

### Database Relationships:

```
vehicle_makes (Ford, Toyota, Honda...)
    ↓
vehicle_models (F-150, Camry, Civic...)
    ↓
vehicle_year_make_models (2024 + Ford + F-150)
    ↓
vehicle_engines (5.0L V8, 3.5L EcoBoost...)
    ↓
vehicle_drive_types (4WD, RWD)
```

## 🔍 Data Source: NHTSA vPIC API

**Why NHTSA?**
- ✅ **Official US Government database** - Most accurate source
- ✅ **Free, no API key required** - Publicly accessible
- ✅ **Comprehensive** - Covers all vehicles sold in the US since 1980s
- ✅ **Regularly updated** - New model years added automatically
- ✅ **Legal compliance** - Required for VIN decoding by law

**API Documentation:** https://vpic.nhtsa.dot.gov/api/

## 🎨 Next Steps

### 1. Update Your Components

Modify your vehicle selectors to use the new API endpoints:

**Before** (hardcoded data):
```typescript
const makes = ['Ford', 'Chevrolet', 'Toyota']
```

**After** (real database data):
```typescript
const { data: makes } = await fetch('/api/vehicles/makes?year=2024')
```

### 2. Complete Engine & Drive Type Population

The current script populates:
- ✅ Makes
- ✅ Models
- ✅ Year/Make/Model combinations

**Still TODO** (requires manual work or additional NHTSA calls):
- ⏳ Engines (need VIN decoding or manual data entry)
- ⏳ Drive types
- ⏳ Trim levels

For engines, you can either:
- **Option A:** Use VIN decoding to get real specs
- **Option B:** Manually add common engines from vehicle-data.ts
- **Option C:** Use automotive databases like Edmunds API (paid)

### 3. Add More API Endpoints

Create additional endpoints for complete cascading:

```
/api/vehicles/engines?year=2024&make=Ford&model=F-150
/api/vehicles/driveTypes?year=2024&make=Ford&model=F-150&engine=5.0L%20V8
/api/vehicles/trims?year=2024&make=Ford&model=F-150
```

## 📝 Common Issues & Solutions

### Issue: Script fails with "database connection error"

**Solution:** Check your `.env.local` has correct `DATABASE_URL`

### Issue: Rate limiting errors from NHTSA

**Solution:** The script already includes rate limiting (100ms between requests). NHTSA allows reasonable request rates.

### Issue: Some makes/models missing

**Solution:** NHTSA only has data for vehicles sold in the US. For international vehicles or powersports, you'll need additional data sources.

### Issue: Want to reset and start over

```sql
-- WARNING: This deletes ALL vehicle specification data
TRUNCATE TABLE vehicle_drive_types CASCADE;
TRUNCATE TABLE vehicle_engines CASCADE;
TRUNCATE TABLE vehicle_trims CASCADE;
TRUNCATE TABLE vehicle_year_make_models CASCADE;
TRUNCATE TABLE vehicle_models CASCADE;
TRUNCATE TABLE vehicle_makes CASCADE;
```

## 🎓 Understanding the Data Model

**Why this structure?**

Instead of storing every possible combination as individual records (which would be millions of rows), we use a normalized structure:

1. **vehicle_makes** - ~100 rows (all manufacturers)
2. **vehicle_models** - ~2,000 rows (all model names)
3. **vehicle_year_make_models** - ~50,000 rows (valid year + make + model combinations)
4. **vehicle_engines** - ~200,000 rows (engines for each combination)

This allows:
- ✅ Efficient storage
- ✅ Fast queries
- ✅ Easy updates
- ✅ Accurate year ranges
- ✅ Proper cascading relationships

## 📞 Support

For issues or questions:
1. Check the NHTSA vPIC API docs: https://vpic.nhtsa.dot.gov/api/
2. Review the population script output for errors
3. Check database logs for constraint violations
4. Verify your year ranges are reasonable (1990-2025)

---

**Last Updated:** January 16, 2025
