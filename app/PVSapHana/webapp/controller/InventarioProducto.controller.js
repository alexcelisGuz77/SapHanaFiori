sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (BaseController, MessageBox, MessageToast) {
    "use strict";

    return BaseController.extend("PVSapHana.controller.InventarioProducto", {
        onInit: function () {
            var oFormModel = new sap.ui.model.json.JSONModel({
                newInventarioProducto: {
                    ID: null,
                    products_id: null,
                    inventario_id: null,
                    cantidad: "",
                    cantidadMin: "",
                    cantidadMax: "",
                    ubicacion: "",
                    precioVenta: "",
                    fechaAlta:"",
                    fechaEdita:"",  
                    usuarioAlta:"", 
                    usuarioEdita:""
                }
            });
            this.getView().setModel(oFormModel, "formModel");
        },

        onSaveInventarioProducto: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oRawData = oFormModel.getProperty("/newInventarioProducto");

            console.log("--->" + oRawData.products_id +"   "+oFormModel  );
        
            // Aseguramos que solo se pase el UUID (string) en vez de un objeto
            const oNewInventarioProducto = {
                products: oRawData.products_id,  
                inventario: oRawData.inventario_id,
                cantidad: oRawData.cantidad,
                cantidadMin: oRawData.cantidadMin,
                cantidadMax: oRawData.cantidadMax,
                ubicacion: oRawData.ubicacion,
                precioVenta: oRawData.precioVenta,
                fechaAlta: oRawData.fechaAlta,
                fechaEdita: oRawData.fechaEdita,
                usuarioAlta: oRawData.usuarioAlta,
                usuarioEdita: oRawData.usuarioEdita
            };
        
            const oTable = oView.byId("inventarioProductosTable");
            const oBinding = oTable.getBinding("items");
        
            if (this._oEditingContext) {
                // Aquí también puedes corregir si es necesario
                Object.keys(oNewInventarioProducto).forEach(prop => {
                    this._oEditingContext.setProperty(prop, oNewInventarioProducto[prop]);
                });
            } else {
                oBinding.create(oNewInventarioProducto);
                sap.m.MessageToast.show("Añadiendo Producto al inventario");
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
                fechaAlta: "",
                fechaEdita: "",
                usuarioAlta: "",
                usuarioEdita: ""
            });
        },
        

        onBuscarInventarioProductoPorId: async function(oEvent){
            const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
            const oModel = this.getView().getModel();
            
            if(!oContext){
                sap.m.MessageToast.show("No se puedo optener el contexto del Inventario");
                return;
            }

            const sPath = oContext.getPath();

            try{
                const oBoundContext = oModel.bindContext(sPath);
                const oData = await oBoundContext.requestObject();

                if(!oData){
                    throw new Error("No se encontro la relacion Inventario Producto");
                }

                this.getView().getModel("formModel").setProperty("newInventarioProducto", oData);
                sap.m.MessageToast.show("Iventario Producto cargado para edicion");
                this._oEditingContext = context;
            }catch(err){
                console.error("Error al optener la relacion de inventario Porducto", err);
                sap.m.MessageBox.error("No se pudo optener la relacion de inventario producto");
            }

        }

    });
});