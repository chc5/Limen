from django.db import models

class Function(models.Model):
    name = models.CharField(max_length=50, primary_key=True)

    def __str__(self):
        return self.name

class Parameter(models.Model):
    name = models.CharField(max_length=50, primary_key=True)
    regexp_verifier = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class FunctionParameter(models.Model):
    id = models.AutoField(primary_key=True)
    function = models.ForeignKey(Function, on_delete=models.CASCADE)
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE)
    required = models.BooleanField(default=False)

    def __str__(self):
        return self.function.name+" "+self.parameter.name
