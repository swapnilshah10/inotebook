from django.db import models
from django.contrib.auth.models import User

class Notes(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE ,default= 1)
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    tags = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return str(self.id)

    def create_note( name, owner,description=None,tags = None,**extra_fields):
        if not name:
            raise ValueError('The name must be set')
        note = Notes(name= name , description= description ,tags =tags ,owner=owner)
        note.save()
        return note


    def get_all_objects(owner):
        queryset = Notes.objects.filter(owner = owner)
        return queryset

    def delete_note(id):
        Notes.get(id=id).delete()
        return True
