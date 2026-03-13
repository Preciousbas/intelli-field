import { useState, useMemo, useCallback } from 'react';
import { FACILITIES } from '../data/facilities';
import { findNearest, uniqueValues } from '../lib/geo';
import type { FacilityResult } from '../types';
export function useFacilities() {
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxKm, setMaxKm] = useState(50);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const states = useMemo(() => uniqueValues(FACILITIES, 'state'), []);
  const categories = useMemo(() => uniqueValues(FACILITIES, 'category'), []);
  const results: FacilityResult[] = useMemo(() => {
    if (userLat == null || userLng == null) return [];
    return findNearest(userLat, userLng, FACILITIES, {
      maxKm,
      category: selectedCategory || undefined,
      state: selectedState || undefined,
      limit: 25,
    });
  }, [userLat, userLng, maxKm, selectedCategory, selectedState]);
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLat(pos.coords.latitude);
        setUserLng(pos.coords.longitude);
        setIsLocating(false);
      },
      (err) => {
        setLocationError(err.message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);
  const setManualLocation = useCallback((lat: number, lng: number) => {
    setUserLat(lat);
    setUserLng(lng);
    setLocationError(null);
  }, []);
  const totalFacilities = FACILITIES.length;
  return {
    results,
    userLat,
    userLng,
    states,
    categories,
    selectedState,
    selectedCategory,
    maxKm,
    isLocating,
    locationError,
    totalFacilities,
    setSelectedState,
    setSelectedCategory,
    setMaxKm,
    getUserLocation,
    setManualLocation,
  };
}