sap.ui.define([
  "./BaseController",
  "sap/m/MessageBox",
  "sap/m/MessageToast",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Filter, FilterOperator) {
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
        const oContext = this._oEditingContext;
        Object.entries(oNewProserieFacturaduct).forEach(([key, value]) => {
          oContext.setProperty(key, value);
        });

        sap.m.MessageToast.show("Proucto actualizado correctamente");
        this._oEditingContext = null;
      } else {
        oBinding.create(oNewProserieFacturaduct);
        sap.m.MessageToast.show("Producto en proceso de creación");
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
    },

    onBuscarNegocioPorID: async function (oEvent) {
      const oContext = oEvent.getSource().getParent().getParent().getBindingContext();
      const oModel = this.getView().getModel();

      if (!oContext) {
        sap.m.MessageToast.show("No se pudo obtener el contexto del Producto");
        return;
      }

      const sPath = oContext.getPath();

      try {
        const oBoundContext = oModel.bindContext(sPath);
        const oData = await oBoundContext.requestObject();

        if (!oData) {
          throw new Error("No se encontró el negocio");
        }

        this.getView().getModel("formModel").setProperty("/newProduct", oData);

        sap.m.MessageToast.show("Producto cargado para edición");
        this._oEditingContext = oContext;
      } catch (err) {
        console.error("Error al buscar producto por ID:", err);
        sap.m.MessageBox.error("No se pudo obtener el Procuto");
      }

    },

    onFilterInvoices: function (oEvent) {
      const aFilters = [];
      const sQuery = oEvent.getParameter("query");

      if (sQuery) {
        aFilters.push(new Filter("name", FilterOperator.Contains, sQuery));
      }

      const oTable = this.byId("productsTable");
      const oBinding = oTable.getBinding("items");
      oBinding.filter(aFilters);
    }





  });
});
