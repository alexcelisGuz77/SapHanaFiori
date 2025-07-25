sap.ui.define(["./BaseController", "sap/m/MessageToast"], function (BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("PVSapHana.controller.App", {
		onInit: function () {
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

		onToggleSideNav: function () {
			const oToolPage = this.byId("toolPage");
			if (oToolPage) {
				const bExpanded = oToolPage.getSideExpanded();
				oToolPage.setSideExpanded(!bExpanded);
			} else {
				console.error("No se encontró el control 'toolPage'. Asegúrate de que el ID exista en la vista actual.");
			}
		},

		onLogout: function () {
			MessageToast.show("Has cerrado sesión.");
			// Aquí puedes agregar lógica real de logout
		},

		onMenuItemSelect: function (oEvent) {
			const sKey = oEvent.getParameter("item").getKey();
			this.getOwnerComponent().getRouter().navTo(sKey);

			switch (sKey) {
				case "inicio":
					MessageToast.show("Navegando a Inicio");
					break;
				case "ventas":
					MessageToast.show("Navegando a Ventas");

					break;
				case "clientes":
					MessageToast.show("Navegando a Clientes");
					break;
				case "empleados":
					MessageToast.show("Navegando a Empleados");
					break;

				case "productos":
					MessageToast.show("Navegando a Productos");
					break;

				case "negocio":
					MessageToast.show("Navegando a Negocio");
					break;

				case "inventario":
					MessageToast.show("Navegando a Inventario");
					break;

				case "inventarioProducto":
					MessageToast.show("Navegando a Inventario Producto");
					break;

				case "configuracion":
					MessageToast.show("Navegando a Configuración");
					break;

				case "pedidos":
					MessageToast.show("Navegando a Pedidos");
					break;

					case "detallePedidos":
						MessageToast.show("Navegando a Detallar pedido");
						break;

				default:
					MessageToast.show("Sección desconocida.");
			}
		},

		_updatePageContent: function (sText) {
			const oPage = this.byId("mainPage");
			if (oPage) {
				oPage.removeAllContent();
				oPage.addContent(new sap.m.Text({ text: sText }));
			} else {
				console.error("No se encontró el control 'mainPage'. Asegúrate de que exista en la vista.");
			}
		}

	});
});
