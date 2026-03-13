import { MapPin, Navigation, Loader } from 'lucide-react';
import { useFacilities } from '../hooks/use-facilities';
import { PRESET_LOCATIONS } from '../data/facilities';
export function FacilityFinderView() {
  const {
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
  } = useFacilities();
  const hasLocation = userLat != null && userLng != null;
  return (
    <div className="animate-view">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Find Facilities</h1>
        <p className="text-sm text-slate-500 mt-1">
          {totalFacilities} health facilities · Haversine distance · zero credits
        </p>
      </div>
      {/* Location */}
      <div className="border border-slate-200 rounded-lg p-4 mb-5">
        <p className="text-sm font-medium text-slate-900 mb-3">Your location</p>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <button
            onClick={getUserLocation}
            disabled={isLocating}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            {isLocating ? (
              <Loader size={14} className="animate-spin" />
            ) : (
              <Navigation size={14} />
            )}
            {isLocating ? 'Locating…' : 'Use my location'}
          </button>
          {hasLocation && (
            <span className="text-xs text-slate-500 font-mono">
              {userLat!.toFixed(4)}°N, {userLng!.toFixed(4)}°E
            </span>
          )}
        </div>
        {locationError && (
          <p className="text-xs text-red-600 mb-3">{locationError}</p>
        )}
        <p className="text-[11px] text-slate-400 mb-2">Or pick a Nigerian city:</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_LOCATIONS.map((loc) => (
            <button
              key={loc.label}
              onClick={() => setManualLocation(loc.lat, loc.lng)}
              className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                userLat === loc.lat && userLng === loc.lng
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>
      </div>
      {/* Filters */}
      {hasLocation && (
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Max distance</label>
            <select
              value={maxKm}
              onChange={(e) => setMaxKm(Number(e.target.value))}
              className="px-2.5 py-1.5 text-sm border border-slate-200 rounded-md bg-white"
            >
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
              <option value={250}>250 km</option>
              <option value={99999}>Any distance</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-sm border border-slate-200 rounded-md bg-white"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-2.5 py-1.5 text-sm border border-slate-200 rounded-md bg-white"
            >
              <option value="">All states</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* Results */}
      {!hasLocation && (
        <div className="text-center py-16 text-sm text-slate-400">
          <MapPin size={28} className="mx-auto mb-3 text-slate-300" />
          Share your location or pick a city to find nearby facilities
        </div>
      )}
      {hasLocation && results.length === 0 && (
        <div className="text-center py-16 text-sm text-slate-400">
          No facilities found within {maxKm} km with the selected filters
        </div>
      )}
      {hasLocation && results.length > 0 && (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="text-left text-[11px] font-medium text-slate-500 uppercase tracking-wider px-4 py-2.5">
                  Facility
                </th>
                <th className="text-left text-[11px] font-medium text-slate-500 uppercase tracking-wider px-4 py-2.5 hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left text-[11px] font-medium text-slate-500 uppercase tracking-wider px-4 py-2.5 hidden md:table-cell">
                  State
                </th>
                <th className="text-right text-[11px] font-medium text-slate-500 uppercase tracking-wider px-4 py-2.5">
                  Distance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {results.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{f.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {f.type} · {f.ownership}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        f.category === 'Tertiary'
                          ? 'bg-blue-50 text-blue-700'
                          : f.category === 'Secondary'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {f.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{f.state}</td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono tabular-nums text-slate-700">
                      {f.distance < 1
                        ? `${(f.distance * 1000).toFixed(0)} m`
                        : `${f.distance.toFixed(1)} km`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
            <p className="text-[11px] text-slate-400">
              Showing {results.length} nearest results · Distances are straight-line (Haversine)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}