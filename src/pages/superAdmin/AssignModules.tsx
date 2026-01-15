// import { useEffect, useState } from 'react';
// import api from '../../api/axios';
// import {Module,Temple} from '../../types/assingModule';

// const AssignModules = () => {
//   const [temples, setTemples] = useState<Temple[]>([]);
//   const [modules, setModules] = useState<Module[]>([]);
//   const [templeId, setTempleId] = useState<number>(0);
//   const [selectedModules, setSelectedModules] = useState<number[]>([]);

//   useEffect(() => {
//     fetchTemples();
//     fetchModules();
//   }, []);

//   const fetchTemples = async () => {
//     const res = await api.get('/super/temple');
//     setTemples(res.data);
//   };

//   const fetchModules = async () => {
//     const res = await api.get('/super/modules');
//     setModules(res.data);
//   };

//   const fetchTempleModules = async (id: number) => {
//     const res = await api.get(`/super/temple-modules/${id}`);
//     setSelectedModules(res.data); // [1,2,3]
//   };

//   const handleTempleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const id = Number(e.target.value);
//     setTempleId(id);
//     if (id) fetchTempleModules(id);
//     else setSelectedModules([]);
//   };

//   const toggleModule = (id: number) => {
//     setSelectedModules(prev =>
//       prev.includes(id)
//         ? prev.filter(x => x !== id)
//         : [...prev, id]
//     );
//   };

//   const submit = async () => {
//     await api.post('/super/assign-temple-modules', {
//       temple_id: templeId,
//       module_ids: selectedModules,
//     });
//     alert('Modules assigned successfully');
//   };

//   return (
//     <>
//       <h2>Assign Modules to Temple</h2>

//       <select value={templeId} onChange={handleTempleChange}>
//         <option value="">Select Temple</option>
//         {temples.map(t => (
//           <option key={t.id} value={t.id}>
//             {t.name}
//           </option>
//         ))}
//       </select>

//       {templeId > 0 && (
//         <div style={{ marginTop: 15 }}>
//           {modules.map(m => (
//             <label key={m.id} style={{ display: 'block' }}>
//               <input
//                 type="checkbox"
//                 checked={selectedModules.includes(m.id)}
//                 onChange={() => toggleModule(m.id)}
//               />
//               {m.name}
//             </label>
//           ))}
//         </div>
//       )}

//       <button disabled={!templeId} onClick={submit}>
//         Assign Modules
//       </button>
//     </>
//   );
// };

// export default AssignModules;


import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Module, Temple } from '../../types/assingModule';
import './AssignModules.css';

const AssignModules = () => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [templeId, setTempleId] = useState<number>(0);
  const [selectedModules, setSelectedModules] = useState<number[]>([]);

  useEffect(() => {
    fetchTemples();
    fetchModules();
  }, []);

  const fetchTemples = async () => {
    const res = await api.get('/super/temple');
    setTemples(res.data);
  };

  const fetchModules = async () => {
    const res = await api.get('/super/modules');
    setModules(res.data);
  };

  const fetchTempleModules = async (id: number) => {
    const res = await api.get(`/super/temple-modules/${id}`);
    setSelectedModules(res.data);
  };

  const handleTempleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    setTempleId(id);
    if (id) fetchTempleModules(id);
    else setSelectedModules([]);
  };

  const toggleModule = (id: number) => {
    setSelectedModules(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const submit = async () => {
    await api.post('/super/assign-temple-modules', {
      temple_id: templeId,
      module_ids: selectedModules,
    });
    alert('Modules assigned successfully');
  };

  return (
    <div className="assign-container">
      <h2>Assign Modules to Temple</h2>

      <select
        className="select"
        value={templeId}
        onChange={handleTempleChange}
      >
        <option value="">Select Temple</option>
        {temples.map(t => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      {templeId > 0 && (
        <div className="modules-box">
          {modules.map(m => (
            <label key={m.id} className="checkbox">
              <input
                type="checkbox"
                checked={selectedModules.includes(m.id)}
                onChange={() => toggleModule(m.id)}
              />
              <span>{m.name}</span>
            </label>
          ))}
        </div>
      )}

      <button
        className="submit-btn"
        disabled={!templeId}
        onClick={submit}
      >
        Assign Modules
      </button>
    </div>
  );
};

export default AssignModules;
