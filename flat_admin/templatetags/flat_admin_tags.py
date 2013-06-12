from django import template
from django.core.urlresolvers import reverse
from django.template.defaulttags import NowNode
from django.utils.safestring import mark_safe
from flat_admin.config import get_config

register = template.Library()


@register.filter(name='flat_admin_config')
def flat_admin_config(name):
    value = get_config(name)
    return mark_safe(value) if isinstance(value, str) else value


@register.tag
def flat_admin_date(parser, token):
    return NowNode(get_config('HEADER_DATE_FORMAT'))


@register.tag
def flat_admin_time(parser, token):
    return NowNode(get_config('HEADER_TIME_FORMAT'))


@register.filter
def admin_url(obj):
    info = (obj._meta.app_label, obj._meta.module_name)
    return reverse("admin:%s_%s_change" % info, args=[obj.pk])
