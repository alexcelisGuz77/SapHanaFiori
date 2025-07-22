sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend("PVSapHana.controller.Empleados", {
        onInit: function () {
            var oFormModel = new sap.ui.model.json.JSONModel({
                newEmpleados: {
                    nombre: "",
                    apellidoPaterno: "",
                    apellidoMaterno: "",
                    curp: "",
                    rfc: "",
                    fechaNacimiento: new Date(),
                    sexo: 1,
                    correoElectronico: "",
                    usuario: "",
                    puesto: 0,
                    celular: "",
                    negocio_ID: null,
                    estado: 1,
                    audit_fechaAlta: "",
                    audit_fechaEdita: "",
                    audit_usuarioAlta: "",
                    audit_usuarioEdita: ""
                }
            });
            this.getView().setModel(oFormModel, "formModel");

        },

        onSaveEmpleado: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewEmpleados = oFormModel.getProperty("/newEmpleados");

            const oTable = oView.byId("empleadosTable");
            const oBinding = oTable.getBinding("items");

            if (this._oEditingContext) {
                const oContext = this._oEditingContext;
                Object.entries(oNewEmpleados).forEach(([key, value]) => {
                    oContext.setProperty(key, value);
                });

                sap.m.MessageToast.show("Empleados actualizado correctamente");
                this._oEditingContext = null;
            } else {
                oBinding.create(oNewEmpleados);
                sap.m.MessageToast.show("Empleados en proceso de creación");
            }


            oFormModel.setProperty("/newEmpleados", {
                nombre: "",
                apellidoPaterno: "",
                apellidoMaterno: "",
                curp: "",
                rfc: "",
                fechaNacimiento: new Date(),
                sexo: 1,
                correoElectronico: "",
                usuario: "",
                puesto: 0,
                celular: "",
                negocio_ID: null,
                estado: 1,
                audit_fechaAlta: "",
                audit_fechaEdita: "",
                audit_usuarioAlta: "",
                audit_usuarioEdita: ""
            })
        },

        onDeleteEmpleado: function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar este Empleado?", {
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.OK) {
                        oContext.delete()
                            .then(() => {
                                sap.m.MessageToast.show("Empleado eliminado correctamente");
                            })
                            .catch((oError) => {
                                console.error(oError);
                                sap.m.MessageBox.error("Error al emliminar un empleado");
                            });
                    }
                }

            });
        },

        onBuscarEmpleadoById: async function (oEvent) {
            const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
            const oModel = this.getView().getModel();

            if (!oContext) {
                sap.m.MessageToast.show("No se pudo obtener el contexto del Empleado");
                return;
            }

            const sPath = oContext.getPath();

            try {
                const oBoundContext = oModel.bindContext(sPath);
                const oData = await oBoundContext.requestObject();

                if (!oData) {
                    throw new Error("No se encontró el Empleado");
                }

                this.getView().getModel("formModel").setProperty("/newEmpleados", oData);

                sap.m.MessageToast.show("Empleado cargado para edición");
                this._oEditingContext = oContext;
            } catch (err) {
                console.error("Error al buscar Empleado por ID:", err);
                sap.m.MessageBox.error("No se pudo obtener el Empleado");
            }
        },

        onFilterInvoices: function (oEvent) {
            const aFilters = [];
            const sQuery = oEvent.getParameter("query");

            if (sQuery) {
                aFilters.push(new Filter("nombre", FilterOperator.Contains, sQuery));
            }

            const oTable = this.byId("empleadosTable");
            const oBinding = oTable.getBinding("items");
            oBinding.filter(aFilters);
        }


    });
});