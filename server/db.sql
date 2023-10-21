INSERT INTO zones (zone, parcel_area, parcel_width, density_or_intensity, living_area, garage_face, corner_vision_triangle, side_or_street_side, site_coverage, floor_area_ratio)
VALUES
    ('RLD', 
	 '{"name": "Parcel Area", "unit": "sqft", "min": 5000, "max": 9007199254740991}'::JSONB, 
	 '{"name": "Parcel Width", "unit": "ft", "min": 50, "max": 9007199254740991}'::JSONB, 
	 '{"name": "Density/Intensity", "unit": "du/acre", "min": 0, "max": 12}'::JSONB, 
	 '{"name": "Living Area", "min": 10, "unit": "ft", "max": 9007199254740991}'::JSONB, 
	 '{"name": "Garage Face", "min": 23, "unit": "ft", "max": 9007199254740991}'::JSONB, 
	 '{"name": "Corner Vision Triangle", "min": 12, "max": 9007199254740991}'::JSONB, 
	 '{"name": "Side/Street Side", "unit": "ft", "min": 5, "max": 9007199254740991}'::JSONB, 
	 '{"name": "Site Coverage", "unit": "%", "min": 50, "max": 9007199254740991}'::JSONB, 
	 '{"name": "Floor Area Ratio", "min": 0.55, "max": 9007199254740991}'::JSONB);

	
CREATE TABLE zones (
	zone TEXT PRIMARY KEY,
    parcel_area JSONB,
	parcel_width JSONB,
	density_or_intensity JSONB,
	living_area JSONB,
	garage_face JSONB,
	corner_vision_triangle JSONB,
	side_or_street_side JSONB,
	site_coverage JSONB,
	floor_area_ratio JSONB
);

UPDATE zones
SET zone = 'rld',
    parcel_area = '{"min": 6000, "max": 8000}'::JSONB,
    parcel_width = '{"min": 60, "max": 80}'::JSONB

drop table zones

SELECT * FROM zones;

SELECT * FROM zones WHERE zone = 'RLD'

SELECT parcel_area->'min' FROM zones WHERE zone = 'RMD-2';