import { useState, useEffect } from "react";
import backend from "~backend/client";
import type { Paseo } from "~backend/paseos/list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Clock, DollarSign, Mountain } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Paseos() {
  const [paseos, setPaseos] = useState<Paseo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPaseo, setEditingPaseo] = useState<Paseo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    duracion_horas: 0,
    precio: 0,
    dificultad: "facil" as "facil" | "moderado" | "dificil",
    incluye: [""],
    requisitos: [""],
    fotos: [""],
  });

  useEffect(() => {
    loadPaseos();
  }, []);

  const loadPaseos = async () => {
    try {
      const response = await backend.paseos.list();
      setPaseos(response.paseos);
    } catch (error) {
      console.error("Error loading paseos:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los paseos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      duracion_horas: 0,
      precio: 0,
      dificultad: "facil",
      incluye: [""],
      requisitos: [""],
      fotos: [""],
    });
    setEditingPaseo(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedData = {
      ...formData,
      incluye: formData.incluye.filter((item) => item.trim() !== ""),
      requisitos: formData.requisitos.filter((item) => item.trim() !== ""),
      fotos: formData.fotos.filter((item) => item.trim() !== ""),
    };

    try {
      if (editingPaseo) {
        await backend.paseos.update({ id: editingPaseo.id, ...cleanedData });
        toast({
          title: "Paseo actualizado",
          description: "El paseo se actualizó correctamente",
        });
      } else {
        await backend.paseos.create(cleanedData);
        toast({
          title: "Paseo creado",
          description: "El paseo se creó correctamente",
        });
      }
      loadPaseos();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving paseo:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el paseo",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (paseo: Paseo) => {
    setEditingPaseo(paseo);
    setFormData({
      nombre: paseo.nombre,
      descripcion: paseo.descripcion,
      duracion_horas: paseo.duracion_horas,
      precio: paseo.precio,
      dificultad: paseo.dificultad,
      incluye: paseo.incluye.length > 0 ? paseo.incluye : [""],
      requisitos: paseo.requisitos.length > 0 ? paseo.requisitos : [""],
      fotos: paseo.fotos.length > 0 ? paseo.fotos : [""],
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este paseo?")) return;

    try {
      await backend.paseos.deletePaseo({ id });
      toast({
        title: "Paseo eliminado",
        description: "El paseo se eliminó correctamente",
      });
      loadPaseos();
    } catch (error) {
      console.error("Error deleting paseo:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el paseo",
        variant: "destructive",
      });
    }
  };

  const updateArrayField = (field: "incluye" | "requisitos" | "fotos", index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: "incluye" | "requisitos" | "fotos") => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field: "incluye" | "requisitos" | "fotos", index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray.length > 0 ? newArray : [""] });
  };

  const getDificultadBadge = (dificultad: string) => {
    const variants = {
      facil: "bg-green-500/10 text-green-500 border-green-500/20",
      moderado: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      dificil: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return variants[dificultad as keyof typeof variants] || "";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Cargando paseos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Paseos y Tours</h1>
          <p className="text-muted-foreground">Administra los paseos disponibles para tus clientes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Paseo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPaseo ? "Editar Paseo" : "Crear Nuevo Paseo"}</DialogTitle>
              <DialogDescription>
                Completa la información del paseo o tour
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre del Paseo</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    required
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duracion">Duración (horas)</Label>
                    <Input
                      id="duracion"
                      type="number"
                      step="0.5"
                      min="0"
                      value={formData.duracion_horas}
                      onChange={(e) => setFormData({ ...formData, duracion_horas: parseFloat(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="precio">Precio (USD)</Label>
                    <Input
                      id="precio"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="dificultad">Dificultad</Label>
                    <Select
                      value={formData.dificultad}
                      onValueChange={(value: "facil" | "moderado" | "dificil") =>
                        setFormData({ ...formData, dificultad: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facil">Fácil</SelectItem>
                        <SelectItem value="moderado">Moderado</SelectItem>
                        <SelectItem value="dificil">Difícil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>¿Qué incluye?</Label>
                  {formData.incluye.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayField("incluye", index, e.target.value)}
                        placeholder="Ej: Guía experto"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("incluye", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("incluye")}>
                    <Plus className="h-4 w-4 mr-1" /> Agregar
                  </Button>
                </div>

                <div>
                  <Label>Requisitos</Label>
                  {formData.requisitos.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayField("requisitos", index, e.target.value)}
                        placeholder="Ej: Edad mínima 16 años"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("requisitos", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("requisitos")}>
                    <Plus className="h-4 w-4 mr-1" /> Agregar
                  </Button>
                </div>

                <div>
                  <Label>URLs de Fotos</Label>
                  {formData.fotos.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={item}
                        onChange={(e) => updateArrayField("fotos", index, e.target.value)}
                        placeholder="https://ejemplo.com/foto.jpg"
                        type="url"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeArrayItem("fotos", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("fotos")}>
                    <Plus className="h-4 w-4 mr-1" /> Agregar
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingPaseo ? "Actualizar" : "Crear"} Paseo
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paseos.map((paseo) => (
          <Card key={paseo.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{paseo.nombre}</CardTitle>
                  <CardDescription className="mt-2">{paseo.descripcion}</CardDescription>
                </div>
                <Badge className={getDificultadBadge(paseo.dificultad)}>
                  {paseo.dificultad === "facil" ? "Fácil" : paseo.dificultad === "moderado" ? "Moderado" : "Difícil"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{paseo.duracion_horas}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">${paseo.precio.toFixed(2)}</span>
                  </div>
                </div>

                {paseo.incluye.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Incluye:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {paseo.incluye.slice(0, 3).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                      {paseo.incluye.length > 3 && (
                        <li className="text-xs">+ {paseo.incluye.length - 3} más...</li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(paseo)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDelete(paseo.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {paseos.length === 0 && (
        <div className="text-center py-12">
          <Mountain className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hay paseos disponibles</h3>
          <p className="text-muted-foreground mb-4">Crea tu primer paseo para comenzar</p>
        </div>
      )}
    </div>
  );
}