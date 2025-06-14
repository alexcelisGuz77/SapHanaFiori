sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast" // IMPORTANTE: faltaba
  ], function (BaseController, MessageBox, MessageToast) {
    "use strict";
  
    return BaseController.extend("PVSapHana.controller.Productos", {
        onInit: function () {
            // Crear un modelo JSON local y nombrado "formModel"
            var oFormModel = new sap.ui.model.json.JSONModel({
              newProduct: {
                name: "",
                category: "",
                price: 0,
                stock: 0
              }
            });
            this.getView().setModel(oFormModel, "formModel");
          },
          
          onSaveProduct: function () {
            const oView = this.getView();
            const oFormModel = oView.getModel("formModel");
            const oNewProduct = oFormModel.getProperty("/newProduct");
          
            // Acceder al binding de la tabla
            const oTable = oView.byId("productsTable");
            const oBinding = oTable.getBinding("items");
          
            // Crear el nuevo producto desde el binding
            oBinding.create(oNewProduct);
          
            sap.m.MessageToast.show("Producto en proceso de creación...");
          
            // Resetear el formulario
            oFormModel.setProperty("/newProduct", {
              name: "",
              category: "",
              price: 0,
              stock: 0
            });
          },

                  
          onDeleteProduct: function (oEvent) {
            const oButton = oEvent.getSource();
            const oContext = oButton.getBindingContext(); // BindingContext del ítem (producto)
        
            sap.m.MessageBox.confirm("¿Estás seguro de que deseas eliminar este producto?", {
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.OK) {
                        oContext.delete()
                            .then(() => {
                                sap.m.MessageToast.show("Producto eliminado correctamente");
                            })
                            .catch((oError) => {
                                console.error(oError);
                                sap.m.MessageBox.error("Error al eliminar el producto");
                            });
                    }
                }
            });
        }
          
          
    });
  });
  