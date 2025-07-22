sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("PVSapHana.controller.InventarioProducto", {
        onInit: function () {
            var oFormModel = new sap.ui.model.json.JSONModel({
                newInventarioProducto: {
                    ID: null,
                    producto_ID: null,
                    inventario_ID: null,
                    cantidad: "",
                    cantidadMin: "",
                    cantidadMax: "",
                    ubicacion: "",
                    precioVenta: "",
                    audit_fechaAlta: "",
                    audit_fechaEdita: "",
                    audit_usuarioAlta: "",
                    audit_usuarioEdita: ""
                }
            });
            this.getView().setModel(oFormModel, "formModel");
        },

        onSaveInventarioProducto: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oRawData = oFormModel.getProperty("/newInventarioProducto");

            const oTable = oView.byId("inventarioProductosTable");
            const oBinding = oTable.getBinding("items");

            if (this._oEditingContext) {
                const oContext = this._oEditingContext;
                Object.entries(oRawData).forEach(([key, value]) => {
                    oContext.setProperty(key, value);
                });
        
                sap.m.MessageToast.show("Inventario Producto actualizado correctamente");
                this._oEditingContext = null;
            } else {
                oBinding.create(oRawData);
                sap.m.MessageToast.show("Inventario Porducto en proceso de creación");
            }


            // Resetear el formulario
            oFormModel.setProperty("/newInventarioProducto", {
                products_id: null,
                inventario_id: null,
                cantidad: "",
                cantidadMin: "",
                cantidadMax: "",
                ubicacion: "",
                precioVenta: "",
                audit_fechaAlta: "",
                audit_fechaEdita: "",
                audit_usuarioAlta: "",
                audit_usuarioEdita: ""
            });
        },


        onDeleteNegocio: function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar esta relacion Producto Inventario?", {
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.OK) {
                        oContext.delete()
                            .then(() => {
                                sap.m.MessageToast.show("Relacion Producto Inventario eliminado correctamente");
                            })
                            .catch((oError) => {
                                console.error(oError);
                                sap.m.MessageBox.error("Error al eliminar el Producto Inventario");
                            });
                    }
                }

            });
        },


        onBuscarInventarioProductoPorId: async function (oEvent) {
            const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
            const oModel = this.getView().getModel();

            if (!oContext) {
                sap.m.MessageToast.show("No se puedo optener el contexto del Inventario");
                return;
            }

            const sPath = oContext.getPath();

            try {
                const oBoundContext = oModel.bindContext(sPath);
                const oData = await oBoundContext.requestObject();

                if (!oData) {
                    throw new Error("No se encontro la relacion Inventario Producto");
                }

                this.getView().getModel("formModel").setProperty("/newInventarioProducto", oData);
                sap.m.MessageToast.show("Inventario Producto cargado para edicion");
                this._oEditingContext = oContext;
            } catch (err) {
                console.error("Error al optener la relacion de inventario Porducto", err);
                sap.m.MessageBox.error("No se pudo optener la relacion de inventario producto");
            }

        },

        onFilterInvoices: function (oEvent) {
            const aFilters = [];
            const sQuery = oEvent.getParameter("query");
        
            if (sQuery) {
                aFilters.push(new Filter("nombre", FilterOperator.Contains, sQuery));
            }
        
            const oTable = this.byId("inventarioProductosTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        }

    });
});