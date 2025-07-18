sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("PVSapHana.controller.Pedidos", {
        onInit: function () {
            var oFormModel = new sap.ui.model.json.JSONModel({
                newPedido: {
                    ID: null,
                    cliente_ID: null,
                    no: "",
                    empleado_ID: null,
                    negocio_ID: null,
                    estado: "",
                    audit_fechaAlta: "",
                    audit_fechaEdita: "",
                    audit_usuarioAlta: "",
                    audit_usuarioEdita: ""
                }
            });
            this.getView().setModel(oFormModel, "formModel");
        },

        onSavePedido: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewPedido = oFormModel.getProperty("/newPedido");

            const oTable = oView.byId("pedidoTable");
            const oBinding = oTable.getBinding("items");

            if (this._oEditingContext) {
                const oContext = this._oEditingContext;
                Object.entries(oNewPedido).forEach(([key, value]) => {
                    oContext.setProperty(key, value);
                });

                sap.m.MessageToast.show("Negocio actualizado correctamente");
                this._oEditingContext = null;
            } else {
                oBinding.create(oNewPedido);
                sap.m.MessageToast.show("Negocio en proceso de creación");
            }

            oFormModel.setProperty("/newPedido", {
                ID: null,
                cliente_ID: null,
                no: "",
                empleado_ID: null,
                negocio_ID: null,
                estado: "",
                audit_fechaAlta: "",
                audit_fechaEdita: "",
                audit_usuarioAlta: "",
                audit_usuarioEdita: ""
            });
        },

        onDeleteNegocio: function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar este Pedido?", {
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.OK) {
                        oContext.delete()
                            .then(() => {
                                sap.m.MessageToast.show("Pedido eliminado correctamente");
                            })
                            .catch((oError) => {
                                console.error(oError);
                                sap.m.MessageBox.error("Error al eliminar el Pedido");
                            });
                    }
                }

            });
        },

        onBuscarPedidoPorID: async function (oEvent) {
            const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
            const oModel = this.getView().getModel();

            if (!oContext) {
                sap.m.MessageToast.show("No se pudo obtener el contexto del pedido");
                return;
            }

            const sPath = oContext.getPath();

            try {
                const oBoundContext = oModel.bindContext(sPath);
                const oData = await oBoundContext.requestObject();

                if (!oData) {
                    throw new Error("No se encontró el pedido");
                }

                this.getView().getModel("formModel").setProperty("/newPedido", oData);

                sap.m.MessageToast.show("Pedido cargado para edición");
                this._oEditingContext = oContext;
            } catch (err) {
                console.error("Error al buscar pedido por ID:", err);
                sap.m.MessageBox.error("No se pudo obtener el pedido");
            }
        },
        
        onFilterInvoices: function (oEvent) {
            const aFilters = [];
            const sQuery = oEvent.getParameter("query");
        
            if (sQuery) {
                aFilters.push(new Filter("nombre", FilterOperator.Contains, sQuery));
            }
        
            const oTable = this.byId("pedidoTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        }


    });
});