sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("PVSapHana.controller.Negocios", {
        onInit: function () {
            var oFormModel = new sap.ui.model.json.JSONModel({
                newNegocio: {
                    ID: null,
                    nombre: "",
                    direccion: "",
                    celular: "",
                    tipoNegocio: null,
                    estado: null,
                    razonSocial: "",
                    rfc: "",
                    correo: "",
                    ciudad: "",
                    estadoMX: "",
                    codigoPostal: "",
                    paginaWeb: "",
                    facebook: "",
                    instagram: "",
                    regimenFiscal: "",
                    usoCFDI: "",
                    serieFactura: "",
                    folioActual: 1,
                    facturaElectronica: null,
                    moneda: "MXN",
                    zonaHoraria: "America/Mexico_City",
                    audit_fechaAlta: "",
                    audit_fechaEdita: "",
                    audit_usuarioAlta: "",
                    audit_usuarioEdita: ""
                }
            });
            this.getView().setModel(oFormModel, "formModel");
        },

        onSaveNegocio: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewNegocio = oFormModel.getProperty("/newNegocio");

            const oTable = oView.byId("negociosTable");
            const oBinding = oTable.getBinding("items");

            if (this._oEditingContext) {
                const oContext = this._oEditingContext;
                Object.entries(oNewNegocio).forEach(([key, value]) => {
                    oContext.setProperty(key, value);
                });
        
                sap.m.MessageToast.show("Negocio actualizado correctamente");
                this._oEditingContext = null;
            } else {
                oBinding.create(oNewNegocio);
                sap.m.MessageToast.show("Negocio en proceso de creación");
            }
        


            oFormModel.setProperty("/newNegocio", {
                ID: null,
                nombre: "",
                direccion: "",
                celular: "",
                tipoNegocio: null,
                estado: null,
                razonSocial: "",
                rfc: "",
                correo: "",
                ciudad: "",
                estadoMX: "",
                codigoPostal: "",
                paginaWeb: "",
                facebook: "",
                instagram: "",
                regimenFiscal: "",
                usoCFDI: "",
                serieFactura: "",
                folioActual: 1,
                facturaElectronica: null,
                moneda: "MXN",
                zonaHoraria: "America/Mexico_City",
                audit_fechaAlta: "",
                audit_fechaEdita: "",
                audit_usuarioAlta: "",
                audit_usuarioEdita: ""
            });
        },

        onDeleteNegocio: function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar este Negocio?", {
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.OK) {
                        oContext.delete()
                            .then(() => {
                                sap.m.MessageToast.show("Negocio eliminado correctamente");
                            })
                            .catch((oError) => {
                                console.error(oError);
                                sap.m.MessageBox.error("Error al eliminar el Negocio");
                            });
                    }
                }

            });
        },

        onBuscarNegocioPorID: async function (oEvent) {
            const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
            const oModel = this.getView().getModel();

            if (!oContext) {
                sap.m.MessageToast.show("No se pudo obtener el contexto del negocio");
                return;
            }

            const sPath = oContext.getPath();

            try {
                const oBoundContext = oModel.bindContext(sPath);
                const oData = await oBoundContext.requestObject();

                if (!oData) {
                    throw new Error("No se encontró el negocio");
                }

                this.getView().getModel("formModel").setProperty("/newNegocio", oData);

                sap.m.MessageToast.show("Negocio cargado para edición");
                this._oEditingContext = oContext;
            } catch (err) {
                console.error("Error al buscar negocio por ID:", err);
                sap.m.MessageBox.error("No se pudo obtener el negocio");
            }
        },

        onFilterInvoices: function (oEvent) {
            const aFilters = [];
            const sQuery = oEvent.getParameter("query");
        
            if (sQuery) {
                aFilters.push(new Filter("nombre", FilterOperator.Contains, sQuery));
            }
        
            const oTable = this.byId("negociosTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        }
        


    });
});