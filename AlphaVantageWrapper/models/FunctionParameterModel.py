
class Function_Parameter(models.Model):
    function = models.ForeignKey(Function, on_delete=models.CASCADE)
    parameter = models.ForeignKey(Function, on_delete=models.CASCADE)
    required = models.BooleanField(default=False)
