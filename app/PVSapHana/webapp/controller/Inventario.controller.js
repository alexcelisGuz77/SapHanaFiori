sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Filter, FilterOperator) {
    "use strict";
    return BaseController.extend("PVSapHana.controller.Inventario", {
        onInit: function () {
            var oFormModel = new sap.ui.model.json.JSONModel({
                newInventario: {
                    ID: null,
                    negocio_ID: null,
                    nombre: "",
                    nota: "",
                    direccion: "",
                    estado: 0,
                    audit_fechaAlta: "",
                    audit_fechaEdita: "",
                    audit_usuarioAlta: "",
                    audit_usuarioEdita: ""
                }
            });
            this.getView().setModel(oFormModel, "formModel");
        },

        onSaveInventario: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewInventario = oFormModel.getProperty("/newInventario");

            const oTable = oView.byId("inventarioTable");
            const oBinding = oTable.getBinding("items");

            if (this._oEditingContext) {
                const oContext = this._oEditingContext;
                Object.entries(oNewInventario).forEach(([key, value]) => {
                    oContext.setProperty(key, value);
                });
        
                sap.m.MessageToast.show("Inventario actualizado correctamente");
                this._oEditingContext = null;
            } else {
                oBinding.create(oNewInventario);
                sap.m.MessageToast.show("Inventario en proceso de creación");
            }

            oFormModel.setProperty("/newInventario", {
                negocio_ID: null,
                nombre: "",
                nota: "",
                direccion: "",
                estado: 0,
                audit_fechaAlta: "",
                audit_fechaEdita: "",
                audit_usuarioAlta: "",
                audit_usuarioEdita: ""
            });
        },

       
        onDeleteInventario: function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar este Inventario?", {
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.OK) {
                        oContext.delete()
                            .then(() => {
                                sap.m.MessageToast.show("Inventario eliminado correctamente");
                            })
                            .catch((oError) => {
                                console.error(oError);
                                sap.m.MessageBox.error("Error al eliminar el Inventario");
                            });
                    }
                }

            });
        },

        onBuscarInventarioPorID: async function (oEvent) {
            const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
            const oModel = this.getView().getModel();

            if (!oContext) {
                sap.m.MessageToast.show("No se pudo obtener el contexto del Inventario");
                return;
            }

            const sPath = oContext.getPath();

            try {
                const oBoundContext = oModel.bindContext(sPath);
                const oData = await oBoundContext.requestObject();

                if (!oData) {
                    throw new Error("No se encontro el Inventario");
                }
                this.getView().getModel("formModel").setProperty("/newInventario", oData);
                sap.m.MessageToast.show("Inventario cargado para edición");
                this._oEditingContext = oContext;
            } catch (err) {
                console.error("Error al buscar el Inventario por ID", err);
                sap.m.MessageBox.error("No se pudo obtener el Inventario");
            }
        },

        onFilterInvoices: function (oEvent) {
            const aFilters = [];
            const sQuery = oEvent.getParameter("query");
        
            if (sQuery) {
                aFilters.push(new Filter("nombre", FilterOperator.Contains, sQuery));
            }
        
            const oTable = this.byId("inventarioTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        }
        

    });
});