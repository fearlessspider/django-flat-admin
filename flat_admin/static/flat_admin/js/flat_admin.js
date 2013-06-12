/**
 * Created with PyCharm.
 * User: fearless
 * Date: 11.06.13
 * Time: 13:59
 * To change this template use File | Settings | File Templates.
 */
/**
 * Django admin inlines
 *
 * Based on jQuery Formset 1.1
 * @author Stanislaus Madueke (stan DOT madueke AT gmail DOT com)
 * @requires jQuery 1.2.6 or later
 *
 * Copyright (c) 2009, Stanislaus Madueke
 * All rights reserved.
 *
 * Spiced up with Code from Zain Memon's GSoC project 2009
 * and modified for Django by Jannis Leidel, Travis Swicegood and Julien Phalip.
 *
 * Licensed under the New BSD License
 * See: http://www.opensource.org/licenses/bsd-license.php
 */
(function($) {
  $.fn.flat_formset = function(opts) {
    var options = $.extend({}, $.fn.flat_formset.defaults, opts);
    var $this = $(this);
    var $parent = $this.parent();
    var updateElementIndex = function(el, prefix, ndx) {
      var id_regex = new RegExp("(" + prefix + "-(\\d+|__prefix__))");
      var replacement = prefix + "-" + ndx;
      if ($(el).attr("for")) {
        $(el).attr("for", $(el).attr("for").replace(id_regex, replacement));
      }
      if (el.id) {
        el.id = el.id.replace(id_regex, replacement);
      }
      if (el.name) {
        el.name = el.name.replace(id_regex, replacement);
      }
    };
    var totalForms = $("#id_" + options.prefix + "-TOTAL_FORMS").attr("autocomplete", "off");
    var nextIndex = parseInt(totalForms.val(), 10);
    var maxForms = $("#id_" + options.prefix + "-MAX_NUM_FORMS").attr("autocomplete", "off");
    // only show the add button if we are allowed to add more items,
        // note that max_num = None translates to a blank string.
    var showAddButton = maxForms.val() === '' || (maxForms.val()-totalForms.val()) > 0;
    $this.each(function(i) {
      $(this).not("." + options.emptyCssClass).addClass(options.formCssClass);
    });
    if ($this.length && showAddButton) {
      var addButton;
      if ($this.attr("tagName") == "div" && $this.attr("cssClass") == "tab-pane") {
        // If forms are laid out as table rows, insert the
        // "add" button in a new table row:
        //var numCols = this.eq(-1).children().length;
        $parent.append('<div class="' + options.addCssClass + '"><a href="javascript:void(0)">' + options.addText + "</a></div>");
        addButton = $parent.find("div.tab-pane:last a");
      } else {
        // Otherwise, insert it immediately after the last form:
        $this.filter(":last").after('<div class="' + options.addCssClass + '"><a href="javascript:void(0)">' + options.addText + "</a></div>");
        addButton = $this.filter(":last").next().find("a");
      }
      addButton.click(function(e) {
        e.preventDefault();
        var totalForms = $("#id_" + options.prefix + "-TOTAL_FORMS");
        var tab_template = $("#tab-" + options.prefix + "-empty");
        var template = $("#" + options.prefix + "-empty");
        var tab_row = tab_template.clone(true);
        var row = template.clone(true);
        var tab_link = tab_row.find("a");
        tab_row.removeClass(options.emptyCssClass).removeClass("active")
          .addClass(options.formCssClass)
          .attr("id", "");
        tab_link.attr("href","#" + options.prefix + "-" + nextIndex).text(tab_link.text().substr(0, tab_link.text().lastIndexOf(' ')) + " " + nextIndex);
        row.removeClass(options.emptyCssClass).removeClass("active")
          .addClass(options.formCssClass)
          .attr("id", options.prefix + "-" + nextIndex);
        if (row.is("div")) {
          // If the forms are laid out in table rows, insert
          // the remove button into the last table cell:
          row.children(":last").append('<div><a class="' + options.deleteCssClass +'" href="javascript:void(0)">' + options.deleteText + "</a></div>");
        } else if (row.is("ul") || row.is("ol")) {
          // If they're laid out as an ordered/unordered list,
          // insert an <li> after the last list item:
          row.append('<li><a class="' + options.deleteCssClass +'" href="javascript:void(0)">' + options.deleteText + "</a></li>");
        } else {
          // Otherwise, just insert the remove button as the
          // last child element of the form's container:
          row.children(":first").append('<span><a class="' + options.deleteCssClass + '" href="javascript:void(0)">' + options.deleteText + "</a></span>");
        }
        tab_row.find("*").each(function() {
          updateElementIndex(this, options.prefix, totalForms.val());
        });
        row.find("*").each(function() {
          updateElementIndex(this, options.prefix, totalForms.val());
        });
        // Insert the new form when it has been fully edited
        tab_row.insertBefore($(tab_template));
        row.insertBefore($(template));
        // Update number of total forms
        $(totalForms).val(parseInt(totalForms.val(), 10) + 1);
        nextIndex += 1;
        // Hide add button in case we've hit the max, except we want to add infinitely
        if ((maxForms.val() !== '') && (maxForms.val()-totalForms.val()) <= 0) {
          addButton.parent().hide();
        }
        // The delete button of each row triggers a bunch of other things
        row.find("a." + options.deleteCssClass).click(function(e) {
          e.preventDefault();
          // Remove the parent form containing this button:
          var row = $(this).parents("." + options.formCssClass);
          row.remove();
          nextIndex -= 1;
          // If a post-delete callback was provided, call it with the deleted form:
          if (options.removed) {
            options.removed(row);
          }
          // Update the TOTAL_FORMS form count.
          var forms = $("." + options.formCssClass);
          $("#id_" + options.prefix + "-TOTAL_FORMS").val(forms.length);
          // Show add button again once we drop below max
          if ((maxForms.val() === '') || (maxForms.val()-forms.length) > 0) {
            addButton.parent().show();
          }
          // Also, update names and ids for all remaining form controls
          // so they remain in sequence:
          for (var i=0, formCount=forms.length; i<formCount; i++)
          {
            updateElementIndex($(forms).get(i), options.prefix, i);
            $(forms.get(i)).find("*").each(function() {
              updateElementIndex(this, options.prefix, i);
            });
          }
        });
        // If a post-add callback was supplied, call it with the added form:
        if (options.added) {
          options.added(row);
        }
      });
    }
    return this;
  };

  /* Setup plugin defaults */
  $.fn.flat_formset.defaults = {
    prefix: "form",          // The form prefix for your django formset
    addText: "add another",      // Text for the add link
    deleteText: "remove",      // Text for the delete link
    addCssClass: "add-row",      // CSS class applied to the add link
    deleteCssClass: "delete-row",  // CSS class applied to the delete link
    emptyCssClass: "empty-row",    // CSS class applied to the empty row
    formCssClass: "dynamic-form",  // CSS class applied to each form in a formset
    added: null,          // Function called each time a new form is added
    removed: null          // Function called each time a form is deleted
  };


  // Tabular inlines ---------------------------------------------------------
  $.fn.tabularFlatFormset = function(options) {
    var $rows = $(this);
    var alternatingRows = function(row) {
      $($rows.selector).not(".add-row").removeClass("row1 row2")
        .filter(":even").addClass("row1").end()
        .filter(":odd").addClass("row2");
    };

    var reinitDateTimeShortCuts = function() {
      // Reinitialize the calendar and clock widgets by force
      if (typeof DateTimeShortcuts != "undefined") {
        $(".datetimeshortcuts").remove();
        DateTimeShortcuts.init();
      }
    };

    var updateSelectFilter = function() {
      // If any SelectFilter widgets are a part of the new form,
      // instantiate a new SelectFilter instance for it.
      if (typeof SelectFilter != 'undefined'){
        $('.selectfilter').each(function(index, value){
          var namearr = value.name.split('-');
          SelectFilter.init(value.id, namearr[namearr.length-1], false, options.adminStaticPrefix );
        });
        $('.selectfilterstacked').each(function(index, value){
          var namearr = value.name.split('-');
          SelectFilter.init(value.id, namearr[namearr.length-1], true, options.adminStaticPrefix );
        });
      }
    };

    var initPrepopulatedFields = function(row) {
      row.find('.prepopulated_field').each(function() {
        var field = $(this),
            input = field.find('input, select, textarea'),
            dependency_list = input.data('dependency_list') || [],
            dependencies = [];
        $.each(dependency_list, function(i, field_name) {
          dependencies.push('#' + row.find('.field-' + field_name).find('input, select, textarea').attr('id'));
        });
        if (dependencies.length) {
          input.prepopulate(dependencies, input.attr('maxlength'));
        }
      });
    };

    $rows.flat_formset({
      prefix: options.prefix,
      addText: options.addText,
      formCssClass: "dynamic-" + options.prefix,
      deleteCssClass: "inline-deletelink",
      deleteText: options.deleteText,
      emptyCssClass: "empty-form",
      removed: alternatingRows,
      added: function(row) {
        initPrepopulatedFields(row);
        reinitDateTimeShortCuts();
        updateSelectFilter();
        alternatingRows(row);
      }
    });

    return $rows;
  };

  // Stacked inlines ---------------------------------------------------------
  $.fn.stackedFlatFormset = function(options) {
    var $rows = $(this);
    var updateInlineLabel = function(row) {
      $($rows.selector).find(".inline_label").each(function(i) {
        var count = i + 1;
        $(this).html($(this).html().replace(/(#\d+)/g, "#" + count));
      });
    };

    var reinitDateTimeShortCuts = function() {
      // Reinitialize the calendar and clock widgets by force, yuck.
      if (typeof DateTimeShortcuts != "undefined") {
        $(".datetimeshortcuts").remove();
        DateTimeShortcuts.init();
      }
    };

    var updateSelectFilter = function() {
      // If any SelectFilter widgets were added, instantiate a new instance.
      if (typeof SelectFilter != "undefined"){
        $(".selectfilter").each(function(index, value){
          var namearr = value.name.split('-');
          SelectFilter.init(value.id, namearr[namearr.length-1], false, options.adminStaticPrefix);
        });
        $(".selectfilterstacked").each(function(index, value){
          var namearr = value.name.split('-');
          SelectFilter.init(value.id, namearr[namearr.length-1], true, options.adminStaticPrefix);
        });
      }
    };

    var initPrepopulatedFields = function(row) {
      row.find('.prepopulated_field').each(function() {
        var field = $(this),
            input = field.find('input, select, textarea'),
            dependency_list = input.data('dependency_list') || [],
            dependencies = [];
        $.each(dependency_list, function(i, field_name) {
          dependencies.push('#' + row.find('.form-row .field-' + field_name).find('input, select, textarea').attr('id'));
        });
        if (dependencies.length) {
          input.prepopulate(dependencies, input.attr('maxlength'));
        }
      });
    };

    $rows.flat_formset({
      prefix: options.prefix,
      addText: options.addText,
      formCssClass: "dynamic-" + options.prefix,
      deleteCssClass: "inline-deletelink",
      deleteText: options.deleteText,
      emptyCssClass: "empty-form",
      removed: updateInlineLabel,
      added: (function(row) {
        initPrepopulatedFields(row);
        reinitDateTimeShortCuts();
        updateSelectFilter();
        updateInlineLabel(row);
      })
    });

    return $rows;
  };
})(django.jQuery);
