sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("PVSapHana.controller.DetallePedido", {

        onInit:function (){
            var oFormModel = new sap.ui.model.json.JSONModel({
                newDetallePedido: {
                    ID: null,
                    pedido_ID: null,
                    producto_ID: null,
                    cantidad: "",
                    precioUnitario: "",
                    estado: "",
                    audit_fechaAlta: "",
                    audit_fechaEdita: "",
                    audit_usuarioAlta: "",
                    audit_usuarioEdita: ""
                }
            });
            this.getView().setModel(oFormModel, "formModel");
            
        },

        onSaveDetallePedido: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewDetallePedido = oFormModel.getProperty("/newDetallePedido");

            const oTable = oView.byId("detallePedidoTable");
            const oBinding = oTable.getBinding("items");

            if (this._oEditingContext) {
                const oContext = this._oEditingContext;
                Object.entries(oNewDetallePedido).forEach(([key, value]) => {
                    oContext.setProperty(key, value);
                });

                sap.m.MessageToast.show("Negocio actualizado correctamente");
                this._oEditingContext = null;
            } else {
                oBinding.create(oNewDetallePedido);
                sap.m.MessageToast.show("Negocio en proceso de creación");
            }

            oFormModel.setProperty("/newDetallePedido", {
                ID: null,
                pedido_ID: null,
                producto_ID: null,
                cantidad: "",
                precioUnitario: "",
                estado: "",
                audit_fechaAlta: "",
                audit_fechaEdita: "",
                audit_usuarioAlta: "",
                audit_usuarioEdita: ""
            });
        },

        onDeleteDetallePedido: function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar este DetallePedido?", {
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.OK) {
                        oContext.delete()
                            .then(() => {
                                sap.m.MessageToast.show("DetallePedido eliminado correctamente");
                            })
                            .catch((oError) => {
                                console.error(oError);
                                sap.m.MessageBox.error("Error al eliminar el DetallePedido");
                            });
                    }
                }

            });
        },

        onBuscarDetallePedidoPorID: async function (oEvent) {
            const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
            const oModel = this.getView().getModel();

            if (!oContext) {
                sap.m.MessageToast.show("No se pudo obtener el contexto del Detalle pedido");
                return;
            }

            const sPath = oContext.getPath();

            try {
                const oBoundContext = oModel.bindContext(sPath);
                const oData = await oBoundContext.requestObject();

                if (!oData) {
                    throw new Error("No se encontró el  Detalle pedido");
                }

                this.getView().getModel("formModel").setProperty("/newDetallePedido", oData);

                sap.m.MessageToast.show("Detalle Pedido cargado para edición");
                this._oEditingContext = oContext;
            } catch (err) {
                console.error("Error al buscar Detalle pedido por ID:", err);
                sap.m.MessageBox.error("No se pudo obtener el Detalle pedido");
            }
        },

                
        onFilterInvoices: function (oEvent) {
            const aFilters = [];
            const sQuery = oEvent.getParameter("query");
        
            if (sQuery) {
                aFilters.push(new Filter("cantidad", FilterOperator.Contains, sQuery));
            }
        
            const oTable = this.byId("detallePedidoTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        }


    });
});
