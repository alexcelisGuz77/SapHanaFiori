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
                    producto_ID: null,
                    inventario_ID: null,
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

            const oTable = oView.byId("inventarioProductosTable");
            const oBinding = oTable.getBinding("items");
            
            if(this._oEditingContext){
                this._oEditingContext.setProperty("producto_ID",oRawData.producto_ID );
                this._oEditingContext.setProperty("inventario_ID",oRawData.inventario_ID );
                this._oEditingContext.setProperty("cantidad",oRawData.cantidad );
                this._oEditingContext.setProperty("cantidadMin",oRawData.cantidadMin );
                this._oEditingContext.setProperty("cantidadMax",oRawData.cantidadMax );
                this._oEditingContext.setProperty("ubicacion",oRawData.ubicacion );
                this._oEditingContext.setProperty("precioVenta",oRawData.precioVenta );
                this._oEditingContext.setProperty("fechaAlta",oRawData.fechaAlta );
                this._oEditingContext.setProperty("fechaEdita",oRawData.fechaEdita );
                this._oEditingContext.setProperty("usuarioAlta",oRawData.usuarioAlta );
                this._oEditingContext.setProperty("usuarioEdita",oRawData.usuarioEdita );
            
                sap.m.MessageToast.show("Realacion Inventario Producto Actualizado correctamente");
                this._oEditingContext = null;
            }else{
                oBinding.create(oRawData);
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
                    console.log("Que onda");
                    throw new Error("No se encontro la relacion Inventario Producto");
                }

                this.getView().getModel("formModel").setProperty("/newInventarioProducto", oData);
                sap.m.MessageToast.show("Iventario Producto cargado para edicion");
                this._oEditingContext = oContext;
            }catch(err){
                console.error("Error al optener la relacion de inventario Porducto", err);
                sap.m.MessageBox.error("No se pudo optener la relacion de inventario producto");
            }

        }

    });
});