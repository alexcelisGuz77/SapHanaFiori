sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Filter, FilterOperator ) {
    "use strict";
    return BaseController.extend("PVSapHana.controller.Cliente", {
        onInit: function () {
            var oFormModel =  new sap.ui.model.json.JSONModel({
                newCliente: {
                    ID: null,
                    nombre: "",
                    telefono: null,
                    celular: null,
                    correoElectronico: "",
                    negocio_ID: null,
                    estado: null,
                    audit_fechaAlta: "",
                    audit_fechaEdita: "",
                    audit_usuarioAlta: "",
                    audit_usuarioEdita: ""
                }
            });

            this.getView().setModel(oFormModel, "formModel");
        },

        onSaveCliente: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewCliente = oFormModel.getProperty("/newCliente");
        
            const oTable = oView.byId("clienteTable");
            const oBinding = oTable.getBinding("items");
        
            if (this._oEditingContext) {
                const oContext = this._oEditingContext;
                Object.entries(oNewCliente).forEach(([key, value]) => {
                    oContext.setProperty(key, value);
                });
        
                sap.m.MessageToast.show("Cliente actualizado correctamente");
                this._oEditingContext = null;
            } else {
                oBinding.create(oNewCliente);
                sap.m.MessageToast.show("Cliente en proceso de creación");
            }
        
            // Limpiar formulario
            oFormModel.setProperty("/newCliente", {
                ID: null,
                nombre: "",
                telefono: null,
                celular: null,
                correoElectronico: "",
                negocio_ID: null,
                estado: null,
                audit_fechaAlta: "",
                audit_fechaEdita: "",
                audit_usuarioAlta: "",
                audit_usuarioEdita: ""
            });
        },

        onDeleteCliente: function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Esta seguro de que quiere eliminar este cliente?", {

                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.OK) {
                        oContext.delete()
                            .then(() => {
                                sap.m.MessageToast.show("Cliente Eliminado Correctamente");
                            })
                            .catch((oError) => {
                                console.error(oError);
                                sap.m.MessageBox.error("Errror al eliminar el cliente");
                            });

                    }
                }

            });

        },

        onBuscarClientePorID: async function (oEvent) {
            const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
            const oModel = this.getView().getModel();
            
            if (!oContext) {
                sap.m.MessageToast.show("No se pudo obtener el contexto del negocio");
                return;
            }

            const sPath = oContext.getPath();

            try{
                const oBoundContext = oModel.bindContext(sPath);
                const oData = await oBoundContext.requestObject();

                if (!oData) {
                    throw new Error("No se encontró el Cliente");
                }

                this.getView().getModel("formModel").setProperty("/newCliente", oData);


                sap.m.MessageToast.show("Cliente cargado para edición");
                this._oEditingContext = oContext;
            } catch (err) {
                console.error("Error al buscar Cliente por ID:", err);
                sap.m.MessageBox.error("No se pudo obtener el Cliente");
            }
        
        },
       
        onFilterInvoices: function (oEvent) {
            const aFilters = [];
            const sQuery = oEvent.getParameter("query");
        
            if (sQuery) {
                aFilters.push(new Filter("nombre", FilterOperator.Contains, sQuery));
            }
        
            const oTable = this.byId("clienteTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        }
        

    });
});