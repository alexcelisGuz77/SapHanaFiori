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

            // Asignar modelo al controlador o a la vista
            this.getView().setModel(oFormModel, "formModel");
        },

        onSaveNegocio: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewNegocio = oFormModel.getProperty("/newNegocio");

            const oTable = oView.byId("negociosTable");
            const oBinding = oTable.getBinding("items");

            oBinding.create(oNewNegocio);

            sap.m.MessageToast.show("Negocio en proceso de creacion ...");

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

        onDeleteNegocio: function (oEvent){
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar este Negocio?",{
                onClose: function (sAction) {
                    if(sAction === sap.m.MessageBox.Action.OK){
                        oContext.delete()
                        .then(() => {
                            sap.m.MessageToast.show("Negocio eliminado correctamente");
                        })
                        .catch((oError)=> {
                            console.error(oError);
                            sap.m.MessageBox.error("Error al eliminar el Negocio");
                        });
                    }
                }

            });
        }

    });
});