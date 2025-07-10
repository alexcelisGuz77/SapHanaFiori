sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (BaseController, MessageBox, MessageToast){
    "use strict";

    return BaseController.extend("PVSapHana.controller.Empleados",{
        onInit: function (){
            var oFormModel = new sap.ui.model.json.JSONModel({
                newEmpleados:{
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
                    fechaAlta: new Date(),
                    fechaEdita: new Date(),
                    usuarioEdita: ""
                }
            });
            this.getView().setModel(oFormModel, "formModel");
        
        },

        onSaveEmpleado: function(){
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewEmpleados = oFormModel.getProperty("/newEmpleados");
                        
            const oTable = oView.byId("empleadosTable");
            const oBinding = oTable.getBinding("items");

            oBinding.create(oNewEmpleados);

            sap.m.MessageToast.show("Empledos en proseso de alta... ");

            oFormModel.setProperty("/newEmpleados",{
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
                fechaAlta: new Date(),
                fechaEdita: new Date(),
                usuarioAlta: "",
                usuarioEdita: ""
            })
        },

        onDeleteEmpleado: function (oEvent){
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext();

            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar este Empleado?",{
                onClose: function (sAction){
                    if(sAction === sap.m.MessageBox.Action.OK){
                        oContext.delete()
                        .then(()=>{
                            sap.m.MessageToast.show("Empleado eliminado correctamente");
                        })
                        .catch((oError)=> {
                            console.error(oError);
                            sap.m.MessageBox.error("Error al emliminar un empleado");
                        });
                    }
                }

            });
        }        
    });
});