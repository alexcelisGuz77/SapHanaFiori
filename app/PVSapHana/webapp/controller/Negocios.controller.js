sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (BaseController, MessageBox, MessageToast) {
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
                    fechaAlta: new Date(),
                    fechaEdita: new Date(),
                    usuarioAlta: "",
                    usuarioEdita: "",
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
                    zonaHoraria: "America/Mexico_City"
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
                this._oEditingContext.setProperty("nombre", oNewNegocio.nombre);
                this._oEditingContext.setProperty("direccion", oNewNegocio.direccion);
                this._oEditingContext.setProperty("celular", oNewNegocio.celular);
                this._oEditingContext.setProperty("tipoNegocio", oNewNegocio.tipoNegocio);
                this._oEditingContext.setProperty("estado", oNewNegocio.estado);
                this._oEditingContext.setProperty("fechaAlta", oNewNegocio.fechaAlta);
                this._oEditingContext.setProperty("fechaEdita", oNewNegocio.fechaEdita);
                this._oEditingContext.setProperty("usuarioAlta", oNewNegocio.usuarioAlta);
                this._oEditingContext.setProperty("usuarioEdita", oNewNegocio.usuarioEdita);
                this._oEditingContext.setProperty("razonSocial", oNewNegocio.razonSocial);
                this._oEditingContext.setProperty("rfc", oNewNegocio.rfc);
                this._oEditingContext.setProperty("correo", oNewNegocio.correo);
                this._oEditingContext.setProperty("ciudad", oNewNegocio.ciudad);
                this._oEditingContext.setProperty("estadoMX", oNewNegocio.estadoMX);
                this._oEditingContext.setProperty("codigoPostal", oNewNegocio.codigoPostal);
                this._oEditingContext.setProperty("paginaWeb", oNewNegocio.paginaWeb);
                this._oEditingContext.setProperty("facebook", oNewNegocio.facebook);
                this._oEditingContext.setProperty("instagram", oNewNegocio.instagram);
                this._oEditingContext.setProperty("regimenFiscal", oNewNegocio.regimenFiscal);
                this._oEditingContext.setProperty("usoCFDI", oNewNegocio.usoCFDI);
                this._oEditingContext.setProperty("serieFactura", oNewNegocio.serieFactura);
                this._oEditingContext.setProperty("folioActual", oNewNegocio.folioActual);
                this._oEditingContext.setProperty("facturaElectronica", oNewNegocio.facturaElectronica);
                this._oEditingContext.setProperty("moneda", oNewNegocio.moneda);
                this._oEditingContext.setProperty("zonaHoraria", oNewNegocio.zonaHoraria);

                sap.m.MessageToast.show("Negocio actualizado correctamente");
                this._oEditingContext = null;
            } else {
                oBinding.create(oNewNegocio);
                sap.m.MessageToast.show("Negocio en Proceso de creacion");

            }


            oFormModel.setProperty("/newNegocio", {
                ID: null,
                nombre: "",
                direccion: "",
                celular: "",
                tipoNegocio: null,
                estado: null,
                fechaAlta: new Date(),
                fechaEdita: new Date(),
                usuarioAlta: "",
                usuarioEdita: "",
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
                zonaHoraria: "America/Mexico_City"
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
        }


    });
});