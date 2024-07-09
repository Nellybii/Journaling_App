from rest_framework import generics, permissions
from ..models import Category
from ..serializers import CategorySerializer

class CategorySerializerCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        entries=Category.objects.filter(user=self.request.user)
        return entries

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)