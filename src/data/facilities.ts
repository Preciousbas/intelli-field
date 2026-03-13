import type { Facility } from '../types';
// Representative subset of Nigerian health facilities with real coordinates.
// Full dataset (34,000+) lives in Inflectiv as structured intelligence (dataset 7519).
// This local copy powers the geospatial Facility Finder at zero credit cost.
export const FACILITIES: Facility[] = [
  // ── LAGOS ──────────────────────────────────────────────────────
  { name: "Lagos University Teaching Hospital (LUTH)", lat: 6.5175, lng: 3.3462, state: "Lagos", lga: "Eti-Osa", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Lagos State University Teaching Hospital (LASUTH)", lat: 6.5383, lng: 3.3541, state: "Lagos", lga: "Ikeja", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "General Hospital Lagos Island", lat: 6.4541, lng: 3.4064, state: "Lagos", lga: "Lagos Island", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "National Orthopaedic Hospital Igbobi", lat: 6.5244, lng: 3.3792, state: "Lagos", lga: "Mushin", type: "Specialist Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Massey Street Children's Hospital", lat: 6.4579, lng: 3.3991, state: "Lagos", lga: "Lagos Island", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  { name: "Ifako Primary Health Centre", lat: 6.6349, lng: 3.3432, state: "Lagos", lga: "Ifako-Ijaiye", type: "Primary Health Centre", category: "Primary", ownership: "LGA" },
  { name: "Surulere Primary Health Centre", lat: 6.5013, lng: 3.3477, state: "Lagos", lga: "Surulere", type: "Primary Health Centre", category: "Primary", ownership: "LGA" },
  { name: "Apapa General Hospital", lat: 6.4488, lng: 3.3637, state: "Lagos", lga: "Apapa", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Ikorodu General Hospital", lat: 6.6194, lng: 3.5105, state: "Lagos", lga: "Ikorodu", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Badagry General Hospital", lat: 6.4151, lng: 2.8814, state: "Lagos", lga: "Badagry", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Alimosho General Hospital", lat: 6.5579, lng: 3.2590, state: "Lagos", lga: "Alimosho", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Epe General Hospital", lat: 6.5852, lng: 3.9833, state: "Lagos", lga: "Epe", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── ABUJA (FCT) ────────────────────────────────────────────────
  { name: "National Hospital Abuja", lat: 9.0425, lng: 7.4892, state: "FCT", lga: "Municipal", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "University of Abuja Teaching Hospital", lat: 8.9904, lng: 7.1816, state: "FCT", lga: "Gwagwalada", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Wuse General Hospital", lat: 9.0634, lng: 7.4753, state: "FCT", lga: "Municipal", type: "General Hospital", category: "Secondary", ownership: "FCT" },
  { name: "Garki Hospital", lat: 9.0386, lng: 7.4893, state: "FCT", lga: "Municipal", type: "General Hospital", category: "Secondary", ownership: "FCT" },
  { name: "Maitama District Hospital", lat: 9.0835, lng: 7.4980, state: "FCT", lga: "Municipal", type: "District Hospital", category: "Secondary", ownership: "FCT" },
  { name: "Nyanya General Hospital", lat: 8.9534, lng: 7.5655, state: "FCT", lga: "Karu", type: "General Hospital", category: "Secondary", ownership: "FCT" },
  { name: "Asokoro District Hospital", lat: 9.0385, lng: 7.5340, state: "FCT", lga: "Municipal", type: "District Hospital", category: "Secondary", ownership: "FCT" },
  { name: "Kubwa General Hospital", lat: 9.1539, lng: 7.3295, state: "FCT", lga: "Bwari", type: "General Hospital", category: "Secondary", ownership: "FCT" },
  // ── KANO ───────────────────────────────────────────────────────
  { name: "Aminu Kano Teaching Hospital", lat: 12.0022, lng: 8.5920, state: "Kano", lga: "Tarauni", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Murtala Muhammad Specialist Hospital", lat: 11.9964, lng: 8.5254, state: "Kano", lga: "Kano Municipal", type: "Specialist Hospital", category: "Tertiary", ownership: "State" },
  { name: "Hasiya Bayero Pediatric Hospital", lat: 11.9952, lng: 8.5231, state: "Kano", lga: "Kano Municipal", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  { name: "Sir Muhammad Sunusi General Hospital", lat: 12.0134, lng: 8.5089, state: "Kano", lga: "Dala", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "National Orthopaedic Hospital Dala", lat: 12.0088, lng: 8.5120, state: "Kano", lga: "Dala", type: "Specialist Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Wudil General Hospital", lat: 11.8103, lng: 8.8506, state: "Kano", lga: "Wudil", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Rano General Hospital", lat: 11.5569, lng: 8.5853, state: "Kano", lga: "Rano", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Tudun Wada PHC", lat: 11.9887, lng: 8.5174, state: "Kano", lga: "Kano Municipal", type: "Primary Health Centre", category: "Primary", ownership: "LGA" },
  // ── OYO ────────────────────────────────────────────────────────
  { name: "University College Hospital (UCH) Ibadan", lat: 7.4003, lng: 3.9060, state: "Oyo", lga: "Ibadan North", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Adeoyo Maternity Hospital", lat: 7.3898, lng: 3.8902, state: "Oyo", lga: "Ibadan South-East", type: "Maternity Hospital", category: "Secondary", ownership: "State" },
  { name: "Ring Road State Hospital", lat: 7.3708, lng: 3.8978, state: "Oyo", lga: "Ibadan South-West", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Oyo State Hospital Ogbomoso", lat: 8.1335, lng: 4.2429, state: "Oyo", lga: "Ogbomoso North", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Ladoke Akintola University Teaching Hospital", lat: 8.1227, lng: 4.2411, state: "Oyo", lga: "Ogbomoso North", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "Jericho Specialist Hospital", lat: 7.3842, lng: 3.8672, state: "Oyo", lga: "Ibadan North-West", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── RIVERS ─────────────────────────────────────────────────────
  { name: "University of Port Harcourt Teaching Hospital", lat: 4.8952, lng: 6.9220, state: "Rivers", lga: "Obio-Akpor", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Braithwaite Memorial Specialist Hospital", lat: 4.7772, lng: 7.0145, state: "Rivers", lga: "Port Harcourt", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  { name: "Rivers State University Teaching Hospital", lat: 4.8026, lng: 7.0022, state: "Rivers", lga: "Port Harcourt", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "Military Hospital Port Harcourt", lat: 4.7925, lng: 7.0188, state: "Rivers", lga: "Port Harcourt", type: "Military Hospital", category: "Secondary", ownership: "Federal" },
  { name: "Kelsey Harrison Hospital", lat: 4.7802, lng: 7.0203, state: "Rivers", lga: "Port Harcourt", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  { name: "Bonny General Hospital", lat: 4.4372, lng: 7.1671, state: "Rivers", lga: "Bonny", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── ENUGU ──────────────────────────────────────────────────────
  { name: "University of Nigeria Teaching Hospital (UNTH)", lat: 6.4154, lng: 7.5081, state: "Enugu", lga: "Enugu South", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Enugu State University Teaching Hospital (ESUTH)", lat: 6.4413, lng: 7.4986, state: "Enugu", lga: "Enugu North", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "National Orthopaedic Hospital Enugu", lat: 6.4427, lng: 7.5103, state: "Enugu", lga: "Enugu North", type: "Specialist Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Park Lane General Hospital", lat: 6.4475, lng: 7.5021, state: "Enugu", lga: "Enugu North", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Nsukka District Hospital", lat: 6.8578, lng: 7.3964, state: "Enugu", lga: "Nsukka", type: "District Hospital", category: "Secondary", ownership: "State" },
  // ── KADUNA ─────────────────────────────────────────────────────
  { name: "Barau Dikko Teaching Hospital", lat: 10.5167, lng: 7.4306, state: "Kaduna", lga: "Kaduna North", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "44 Nigerian Army Reference Hospital", lat: 10.5234, lng: 7.4434, state: "Kaduna", lga: "Kaduna North", type: "Military Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Ahmadu Bello University Teaching Hospital", lat: 11.1534, lng: 7.6519, state: "Kaduna", lga: "Zaria", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Yusuf Dantsoho Memorial Hospital", lat: 10.4879, lng: 7.4167, state: "Kaduna", lga: "Kaduna South", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Kafanchan General Hospital", lat: 9.5833, lng: 8.3000, state: "Kaduna", lga: "Jema'a", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── EDO ────────────────────────────────────────────────────────
  { name: "University of Benin Teaching Hospital (UBTH)", lat: 6.3394, lng: 5.6204, state: "Edo", lga: "Egor", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Central Hospital Benin", lat: 6.3350, lng: 5.6278, state: "Edo", lga: "Oredo", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Stella Obasanjo Hospital", lat: 6.3361, lng: 5.6188, state: "Edo", lga: "Egor", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  { name: "Irrua Specialist Teaching Hospital", lat: 6.7352, lng: 6.2344, state: "Edo", lga: "Esan Central", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  // ── PLATEAU ──────────────────────────────────────────��─────────
  { name: "Jos University Teaching Hospital (JUTH)", lat: 9.8965, lng: 8.8583, state: "Plateau", lga: "Jos North", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Bingham University Teaching Hospital", lat: 9.9011, lng: 8.8625, state: "Plateau", lga: "Jos North", type: "Teaching Hospital", category: "Tertiary", ownership: "Private" },
  { name: "Our Lady of Apostles Hospital", lat: 9.9150, lng: 8.8800, state: "Plateau", lga: "Jos South", type: "General Hospital", category: "Secondary", ownership: "Private" },
  { name: "Plateau State Specialist Hospital", lat: 9.9105, lng: 8.8590, state: "Plateau", lga: "Jos North", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── BORNO ──────────────────────────────────────────────────────
  { name: "University of Maiduguri Teaching Hospital", lat: 11.8311, lng: 13.1510, state: "Borno", lga: "Jere", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Umaru Shehu Ultra-Modern Hospital", lat: 11.8465, lng: 13.1570, state: "Borno", lga: "Maiduguri", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "State Specialist Hospital Maiduguri", lat: 11.8400, lng: 13.1600, state: "Borno", lga: "Maiduguri", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── OGUN ───────────────────────────────────────────────────────
  { name: "Federal Medical Centre Abeokuta", lat: 7.1480, lng: 3.3515, state: "Ogun", lga: "Abeokuta South", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Olabisi Onabanjo University Teaching Hospital", lat: 6.7917, lng: 3.9283, state: "Ogun", lga: "Sagamu", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "Ijebu Ode General Hospital", lat: 6.8194, lng: 3.9186, state: "Ogun", lga: "Ijebu Ode", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── ANAMBRA ────────────────────────────────────────────────────
  { name: "Nnamdi Azikiwe University Teaching Hospital", lat: 6.2108, lng: 6.6802, state: "Anambra", lga: "Nnewi North", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Chukwuemeka Odumegwu Ojukwu University Teaching Hospital", lat: 6.1672, lng: 7.0667, state: "Anambra", lga: "Awka South", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "General Hospital Onitsha", lat: 6.1405, lng: 6.7878, state: "Anambra", lga: "Onitsha North", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── SOKOTO ─────────────────────────────────────────────────────
  { name: "Usmanu Danfodiyo University Teaching Hospital", lat: 13.0632, lng: 5.2133, state: "Sokoto", lga: "Sokoto South", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Specialist Hospital Sokoto", lat: 13.0579, lng: 5.2389, state: "Sokoto", lga: "Sokoto North", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  { name: "Maryam Abacha Women and Children Hospital", lat: 13.0550, lng: 5.2200, state: "Sokoto", lga: "Sokoto South", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── BAUCHI ─────────────────────────────────────────────────────
  { name: "Abubakar Tafawa Balewa University Teaching Hospital", lat: 10.3158, lng: 9.8442, state: "Bauchi", lga: "Bauchi", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Specialist Hospital Bauchi", lat: 10.3100, lng: 9.8400, state: "Bauchi", lga: "Bauchi", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  { name: "General Hospital Misau", lat: 11.3139, lng: 10.4611, state: "Bauchi", lga: "Misau", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── DELTA ──────────────────────────────────────────────────────
  { name: "Federal Medical Centre Asaba", lat: 6.1989, lng: 6.7333, state: "Delta", lga: "Oshimili South", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Delta State University Teaching Hospital", lat: 5.5136, lng: 5.7389, state: "Delta", lga: "Warri South", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "Central Hospital Warri", lat: 5.5167, lng: 5.7500, state: "Delta", lga: "Warri South", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── KWARA ──────────────────────────────────────────────────────
  { name: "University of Ilorin Teaching Hospital", lat: 8.4833, lng: 4.5833, state: "Kwara", lga: "Ilorin West", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "General Hospital Ilorin", lat: 8.4933, lng: 4.5422, state: "Kwara", lga: "Ilorin East", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Civil Service Hospital Ilorin", lat: 8.4800, lng: 4.5500, state: "Kwara", lga: "Ilorin South", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── ONDO ───────────────────────────────────────────────────────
  { name: "Federal Medical Centre Owo", lat: 7.1936, lng: 5.5864, state: "Ondo", lga: "Owo", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "University of Medical Sciences Teaching Hospital Akure", lat: 7.2506, lng: 5.1950, state: "Ondo", lga: "Akure South", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "State Specialist Hospital Akure", lat: 7.2571, lng: 5.2058, state: "Ondo", lga: "Akure South", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── CROSS RIVER ────────────────────────────────────────────────
  { name: "University of Calabar Teaching Hospital", lat: 4.9539, lng: 8.3367, state: "Cross River", lga: "Calabar Municipality", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "General Hospital Calabar", lat: 4.9589, lng: 8.3228, state: "Cross River", lga: "Calabar Municipality", type: "General Hospital", category: "Secondary", ownership: "State" },
  { name: "Naval Hospital Calabar", lat: 4.9600, lng: 8.3200, state: "Cross River", lga: "Calabar Municipality", type: "Military Hospital", category: "Secondary", ownership: "Federal" },
  // ── ABIA ────────────────────────────────────────────────────────
  { name: "Federal Medical Centre Umuahia", lat: 5.5245, lng: 7.4883, state: "Abia", lga: "Umuahia North", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Abia State University Teaching Hospital", lat: 5.1067, lng: 7.3667, state: "Abia", lga: "Aba South", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "General Hospital Aba", lat: 5.1117, lng: 7.3617, state: "Abia", lga: "Aba South", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── BENUE ──────────────────────────────────────────────────────
  { name: "Federal Medical Centre Makurdi", lat: 7.7397, lng: 8.5215, state: "Benue", lga: "Makurdi", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Benue State University Teaching Hospital", lat: 7.7333, lng: 8.5167, state: "Benue", lga: "Makurdi", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "General Hospital Otukpo", lat: 7.1904, lng: 8.1340, state: "Benue", lga: "Otukpo", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── KOGI ───────────────────────────────────────────────────────
  { name: "Federal Medical Centre Lokoja", lat: 7.7963, lng: 6.7408, state: "Kogi", lga: "Lokoja", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Kogi State Specialist Hospital", lat: 7.7975, lng: 6.7350, state: "Kogi", lga: "Lokoja", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── AKWA IBOM ──────────────────────────────────────────────────
  { name: "University of Uyo Teaching Hospital", lat: 5.0087, lng: 7.8499, state: "Akwa Ibom", lga: "Uyo", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Ibom Specialist Hospital", lat: 5.0200, lng: 7.9300, state: "Akwa Ibom", lga: "Uyo", type: "Specialist Hospital", category: "Tertiary", ownership: "State" },
  { name: "General Hospital Eket", lat: 4.6500, lng: 7.9333, state: "Akwa Ibom", lga: "Eket", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── OSUN ───────────────────────────────────────────────────────
  { name: "Obafemi Awolowo University Teaching Hospital", lat: 7.5200, lng: 4.5278, state: "Osun", lga: "Ile-Ife", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Ladoke Akintola University Teaching Hospital Osogbo", lat: 7.7833, lng: 4.5583, state: "Osun", lga: "Osogbo", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  { name: "State Hospital Osogbo", lat: 7.7710, lng: 4.5600, state: "Osun", lga: "Osogbo", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── NIGER ──────────────────────────────────────────────────────
  { name: "Federal Medical Centre Bida", lat: 9.0833, lng: 6.0167, state: "Niger", lga: "Bida", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "General Hospital Minna", lat: 9.6139, lng: 6.5569, state: "Niger", lga: "Chanchaga", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── IMO ────────────────────────────────────────────────────────
  { name: "Federal Medical Centre Owerri", lat: 5.4836, lng: 7.0333, state: "Imo", lga: "Owerri Municipal", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Imo State University Teaching Hospital", lat: 5.4800, lng: 7.0400, state: "Imo", lga: "Owerri West", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  // ── ADAMAWA ────────────────────────────────────────────────────
  { name: "Federal Medical Centre Yola", lat: 9.2000, lng: 12.4833, state: "Adamawa", lga: "Yola South", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Specialist Hospital Yola", lat: 9.2070, lng: 12.4900, state: "Adamawa", lga: "Yola North", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── GOMBE ──────────────────────────────────────────────────────
  { name: "Federal Teaching Hospital Gombe", lat: 10.2833, lng: 11.1667, state: "Gombe", lga: "Gombe", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Specialist Hospital Gombe", lat: 10.2900, lng: 11.1700, state: "Gombe", lga: "Gombe", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── EKITI ──────────────────────────────────────────────────────
  { name: "Federal Teaching Hospital Ido-Ekiti", lat: 7.8353, lng: 5.1814, state: "Ekiti", lga: "Ido/Osi", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Ekiti State University Teaching Hospital", lat: 7.6167, lng: 5.2167, state: "Ekiti", lga: "Ado-Ekiti", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
  // ── KATSINA ────────────────────────────────────────────────────
  { name: "Federal Medical Centre Katsina", lat: 13.0078, lng: 7.6000, state: "Katsina", lga: "Katsina", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "General Hospital Daura", lat: 13.0333, lng: 8.3167, state: "Katsina", lga: "Daura", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── NASSARAWA ──────────────────────────────────────────────────
  { name: "Federal Medical Centre Keffi", lat: 8.8487, lng: 7.8736, state: "Nassarawa", lga: "Keffi", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Dalhatu Araf Specialist Hospital Lafia", lat: 8.4878, lng: 8.5156, state: "Nassarawa", lga: "Lafia", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── EBONYI ─────────────────────────────────────────────────────
  { name: "Federal Teaching Hospital Abakaliki", lat: 6.3249, lng: 8.1137, state: "Ebonyi", lga: "Abakaliki", type: "Teaching Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "General Hospital Afikpo", lat: 5.8919, lng: 7.9389, state: "Ebonyi", lga: "Afikpo North", type: "General Hospital", category: "Secondary", ownership: "State" },
  // ── TARABA ─────────────────────────────────────────────────────
  { name: "Federal Medical Centre Jalingo", lat: 8.9000, lng: 11.3667, state: "Taraba", lga: "Jalingo", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Specialist Hospital Jalingo", lat: 8.8950, lng: 11.3600, state: "Taraba", lga: "Jalingo", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── YOBE ───────────────────────────────────────────────────────
  { name: "Federal Medical Centre Damaturu", lat: 11.7470, lng: 11.9609, state: "Yobe", lga: "Damaturu", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Specialist Hospital Damaturu", lat: 11.7500, lng: 11.9550, state: "Yobe", lga: "Damaturu", type: "Specialist Hospital", category: "Secondary", ownership: "State" },
  // ── ZAMFARA ────────────────────────────────────────────────────
  { name: "Federal Medical Centre Gusau", lat: 12.1625, lng: 6.6611, state: "Zamfara", lga: "Gusau", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  // ── KEBBI ──────────────────────────────────────────────────────
  { name: "Federal Medical Centre Birnin Kebbi", lat: 12.4539, lng: 4.1975, state: "Kebbi", lga: "Birnin Kebbi", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  // ── JIGAWA ────────────────────────────────────────────────────
  { name: "Federal Medical Centre Birnin Kudu", lat: 11.4500, lng: 9.4833, state: "Jigawa", lga: "Birnin Kudu", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  // ── BAYELSA ────────────────────────────────────────────────────
  { name: "Federal Medical Centre Yenagoa", lat: 4.9267, lng: 6.2676, state: "Bayelsa", lga: "Yenagoa", type: "General Hospital", category: "Tertiary", ownership: "Federal" },
  { name: "Niger Delta University Teaching Hospital", lat: 4.9300, lng: 6.2700, state: "Bayelsa", lga: "Yenagoa", type: "Teaching Hospital", category: "Tertiary", ownership: "State" },
];
export const PRESET_LOCATIONS = [
  { label: 'Lagos (Ikeja)', lat: 6.5244, lng: 3.3792 },
  { label: 'Abuja (Central)', lat: 9.0579, lng: 7.4951 },
  { label: 'Kano', lat: 12.0022, lng: 8.5920 },
  { label: 'Port Harcourt', lat: 4.8156, lng: 7.0498 },
  { label: 'Ibadan', lat: 7.3776, lng: 3.9470 },
  { label: 'Enugu', lat: 6.4413, lng: 7.4986 },
  { label: 'Kaduna', lat: 10.5222, lng: 7.4383 },
  { label: 'Benin City', lat: 6.3350, lng: 5.6278 },
  { label: 'Jos', lat: 9.8965, lng: 8.8583 },
  { label: 'Maiduguri', lat: 11.8311, lng: 13.1510 },
];