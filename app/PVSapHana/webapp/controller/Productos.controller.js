sap.ui.define([
  "./BaseController",
  "sap/m/MessageBox",
  "sap/m/MessageToast"
], function (BaseController, MessageBox, MessageToast) {
  "use strict";

  return BaseController.extend("PVSapHana.controller.Productos", {
    onInit: function () {
      // Crear un modelo JSON local y nombrado "formModel"
      var oFormModel = new sap.ui.model.json.JSONModel({
        newProduct: {
          ID: null,
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
      const oNewProserieFacturaduct = oFormModel.getProperty("/newProduct");

      // Acceder al binding de la tabla
      const oTable = oView.byId("productsTable");
      const oBinding = oTable.getBinding("items");

      if (this._oEditingContext) {
        // Estamos editando un producto existente
        this._oEditingContext.setProperty("name", oNewProduct.name);
        this._oEditingContext.setProperty("category", oNewProduct.category);
        this._oEditingContext.setProperty("price", oNewProduct.price);
        this._oEditingContext.setProperty("stock", oNewProduct.stock);
    
        sap.m.MessageToast.show("Producto actualizado correctamente");
        this._oEditingContext = null; // Resetear el contexto de edición
      } else {
        // Crear uno nuevo
        oBinding.create(oNewProduct);
        sap.m.MessageToast.show("Producto en proceso de creación...");
      }

      // Resetear el formulario
      oFormModel.setProperty("/newProduct", {
        ID: null,
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
    },

    onEditProduct: function (oEvent) {
      const Path = oEvent.getSource().getParent().getParent();
      const oContext = oItem.getBindingContext();
      const oData = oContext.getObject();

      MessageToast.show("Editar producto: " + oData.name);

      // También guarda el contexto para posterior actualización
      this._oEditingContext = oContext;

      this.getView().getModel("formModel").setProperty("/newProduct", { ...oData });
    }




  });
});
