sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: PVSapHana",
		defaults: {
			page: "ui5://test-resources/PVSapHana/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "PVSapHana/",
				never: "test-resources/PVSapHana/"
			},
			loader: {
				paths: {
					"PVSapHana": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for PVSapHana"
			},
			"integration/opaTests": {
				title: "Integration tests for PVSapHana"
			}
		}
	};
});
