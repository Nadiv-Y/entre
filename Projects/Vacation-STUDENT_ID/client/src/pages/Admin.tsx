import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { setVacations, addVacation, updateVacation, removeVacation, Vacation } from "../redux/vacationsSlice";
import VacationCard from "../components/VacationCard";
import api from "../services/api";

const empty = { destination: "", description: "", start_date: "", end_date: "", price: "", image: null as File | null };

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.auth.user);
  const vacations = useSelector((s: RootState) => s.vacations.items);

  const [form, setForm] = useState({ ...empty });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!user?.is_admin) { navigate("/vacations"); return; }
    api.get("/vacations").then(res => dispatch(setVacations(res.data)));
  }, [dispatch, navigate, user]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, image: e.target.files?.[0] ?? null }));
  }

  function startEdit(id: number) {
    const v = vacations.find(v => v.id === id);
    if (!v) return;
    setForm({
      destination: v.destination, description: v.description,
      start_date: v.start_date?.slice(0, 10), end_date: v.end_date?.slice(0, 10),
      price: String(v.price), image: null
    });
    setEditId(id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this vacation?")) return;
    await api.delete(`/vacations/${id}`);
    dispatch(removeVacation(id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const fd = new FormData();
    fd.append("destination", form.destination);
    fd.append("description", form.description);
    fd.append("start_date", form.start_date);
    fd.append("end_date", form.end_date);
    fd.append("price", form.price);
    if (form.image) fd.append("image", form.image);

    try {
      if (editId) {
        const res = await api.put(`/vacations/${editId}`, fd);
        dispatch(updateVacation({ ...res.data, isFollowed: false }));
      } else {
        if (!form.image) { setError("Image is required"); return; }
        const res = await api.post("/vacations", fd);
        dispatch(addVacation({ ...res.data, isFollowed: false }));
      }
      setForm({ ...empty });
      setEditId(null);
      setShowForm(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error saving vacation");
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛠️ Manage Vacations</h2>
        <button className="btn btn-success" onClick={() => { setShowForm(true); setEditId(null); setForm({ ...empty }); }}>
          + Add Vacation
        </button>
      </div>

      {showForm && (
        <div className="card shadow mb-5 p-4">
          <h4>{editId ? "✏️ Edit Vacation" : "➕ Add New Vacation"}</h4>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Destination</label>
                <input name="destination" className="form-control" value={form.destination} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Start Date</label>
                <input type="date" name="start_date" className="form-control" value={form.start_date} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">End Date</label>
                <input type="date" name="end_date" className="form-control" value={form.end_date} onChange={handleChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Price ($)</label>
                <input type="number" name="price" min="0" step="0.01" className="form-control" value={form.price} onChange={handleChange} required />
              </div>
              <div className="col-md-9">
                <label className="form-label">Image {editId && <span className="text-muted">(leave blank to keep current)</span>}</label>
                <input type="file" accept="image/*" className="form-control" onChange={handleFile} required={!editId} />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" rows={3} value={form.description} onChange={handleChange} required />
              </div>
            </div>
            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-primary">{editId ? "Save Changes" : "Add Vacation"}</button>
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {vacations.map(v => (
          <div className="col" key={v.id}>
            <VacationCard vacation={v} isAdmin={true} onEdit={startEdit} onDelete={handleDelete} />
          </div>
        ))}
      </div>
    </div>
  );
}
